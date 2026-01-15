import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import { seedActivities } from '@/lib/seed-activities';

const WHATSAPP_NUMBER = '971565330500';

// Helper to get path from request
function getPath(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '') || '/';
  return path;
}

// Helper for CORS headers
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Generate WhatsApp link
function generateWhatsAppLink(tourCode, title) {
  const message = encodeURIComponent(`Hi, I want to book activity ${tourCode} - ${title}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const path = getPath(request);
  const { db } = await connectToDatabase();
  const url = new URL(request.url);

  try {
    // Root endpoint
    if (path === '/' || path === '') {
      return NextResponse.json({ message: 'Purple Royal Tourism API', status: 'running' }, { headers: corsHeaders() });
    }

    // Get all leads (admin)
    if (path === '/leads') {
      const leads = await db.collection('leads').find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json(leads, { headers: corsHeaders() });
    }

    // ========== ACTIVITIES API ==========
    
    // Get all activities (with filters)
    if (path === '/activities') {
      const category = url.searchParams.get('category');
      const featured = url.searchParams.get('featured');
      const search = url.searchParams.get('search');
      
      let query = { active: true };
      
      if (category && category !== 'All') {
        query.category = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { tour_code: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ];
      }
      
      const activities = await db.collection('activities')
        .find(query)
        .sort({ featured: -1, created_at: -1 })
        .toArray();
      
      return NextResponse.json(activities, { headers: corsHeaders() });
    }

    // Get single activity by slug or tour_code
    if (path.startsWith('/activities/')) {
      const identifier = path.replace('/activities/', '');
      const activity = await db.collection('activities').findOne({
        $or: [
          { slug: identifier },
          { tour_code: identifier.toUpperCase() }
        ],
        active: true
      });
      
      if (!activity) {
        return NextResponse.json({ error: 'Activity not found' }, { status: 404, headers: corsHeaders() });
      }
      return NextResponse.json(activity, { headers: corsHeaders() });
    }

    // Get all activities (admin - including inactive)
    if (path === '/admin/activities') {
      const activities = await db.collection('activities')
        .find({})
        .sort({ created_at: -1 })
        .toArray();
      return NextResponse.json(activities, { headers: corsHeaders() });
    }

    // Get activity categories
    if (path === '/activities/categories') {
      const categories = await db.collection('activities').distinct('category', { active: true });
      return NextResponse.json(categories, { headers: corsHeaders() });
    }

    // Seed activities (one-time setup)
    if (path === '/admin/seed-activities') {
      const existingCount = await db.collection('activities').countDocuments();
      if (existingCount > 0) {
        return NextResponse.json({ message: 'Activities already seeded', count: existingCount }, { headers: corsHeaders() });
      }
      
      const activitiesToInsert = seedActivities.map(activity => ({
        ...activity,
        id: uuidv4(),
        whatsapp_link: generateWhatsAppLink(activity.tour_code, activity.title),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      
      await db.collection('activities').insertMany(activitiesToInsert);
      return NextResponse.json({ message: 'Activities seeded successfully', count: activitiesToInsert.length }, { headers: corsHeaders() });
    }

    // ========== BLOG API ==========
    
    // Get all blog posts
    if (path === '/blog') {
      const posts = await db.collection('blog_posts').find({ published: true }).sort({ createdAt: -1 }).toArray();
      return NextResponse.json(posts, { headers: corsHeaders() });
    }

    // Get all blog posts (admin - including unpublished)
    if (path === '/admin/blog') {
      const posts = await db.collection('blog_posts').find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json(posts, { headers: corsHeaders() });
    }

    // Get single blog post by slug
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const post = await db.collection('blog_posts').findOne({ slug, published: true });
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404, headers: corsHeaders() });
      }
      return NextResponse.json(post, { headers: corsHeaders() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const path = getPath(request);
  const { db } = await connectToDatabase();

  try {
    const body = await request.json();

    // Submit lead
    if (path === '/leads') {
      const lead = {
        id: uuidv4(),
        name: body.name,
        phone: body.phone,
        service: body.service,
        travelDate: body.travelDate || null,
        source: body.source || 'website',
        status: 'new',
        createdAt: new Date().toISOString(),
      };

      await db.collection('leads').insertOne(lead);
      return NextResponse.json({ success: true, lead }, { status: 201, headers: corsHeaders() });
    }

    // ========== ACTIVITIES ADMIN ==========
    
    // Create activity (admin)
    if (path === '/admin/activities') {
      const activity = {
        id: uuidv4(),
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tour_code: body.tour_code || `PR${String(Date.now()).slice(-3)}`,
        category: body.category || 'Adventure',
        tags: body.tags || [],
        description: body.description || '',
        price: body.price || 'AED 0',
        duration: body.duration || '',
        location: body.location || 'Dubai',
        image_url: body.image_url || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
        whatsapp_link: generateWhatsAppLink(body.tour_code || `PR${String(Date.now()).slice(-3)}`, body.title),
        featured: body.featured || false,
        active: body.active !== false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await db.collection('activities').insertOne(activity);
      return NextResponse.json({ success: true, activity }, { status: 201, headers: corsHeaders() });
    }

    // ========== BLOG ADMIN ==========
    
    // Create blog post (admin)
    if (path === '/admin/blog') {
      const post = {
        id: uuidv4(),
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        content: body.content,
        excerpt: body.excerpt || body.content.substring(0, 150) + '...',
        category: body.category || 'Travel Tips',
        image: body.image || 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba',
        published: body.published || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await db.collection('blog_posts').insertOne(post);
      return NextResponse.json({ success: true, post }, { status: 201, headers: corsHeaders() });
    }

    // Admin login
    if (path === '/admin/login') {
      const adminPassword = process.env.ADMIN_PASSWORD || 'PurpleRoyal2024!';
      if (body.password === adminPassword) {
        return NextResponse.json({ success: true, token: 'admin-authenticated' }, { headers: corsHeaders() });
      }
      return NextResponse.json({ error: 'Invalid password' }, { status: 401, headers: corsHeaders() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request) {
  const path = getPath(request);
  const { db } = await connectToDatabase();

  try {
    const body = await request.json();

    // Update activity
    if (path.startsWith('/admin/activities/')) {
      const id = path.replace('/admin/activities/', '');
      const updateData = {
        ...body,
        updated_at: new Date().toISOString(),
      };
      
      // Regenerate WhatsApp link if tour_code or title changed
      if (body.tour_code || body.title) {
        const existing = await db.collection('activities').findOne({ id });
        if (existing) {
          updateData.whatsapp_link = generateWhatsAppLink(
            body.tour_code || existing.tour_code,
            body.title || existing.title
          );
        }
      }
      
      delete updateData.id;
      delete updateData._id;

      const result = await db.collection('activities').updateOne(
        { id },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Activity not found' }, { status: 404, headers: corsHeaders() });
      }

      return NextResponse.json({ success: true }, { headers: corsHeaders() });
    }

    // Update blog post
    if (path.startsWith('/admin/blog/')) {
      const id = path.replace('/admin/blog/', '');
      const updateData = {
        ...body,
        updatedAt: new Date().toISOString(),
      };
      delete updateData.id;
      delete updateData._id;

      const result = await db.collection('blog_posts').updateOne(
        { id },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404, headers: corsHeaders() });
      }

      return NextResponse.json({ success: true }, { headers: corsHeaders() });
    }

    // Update lead status
    if (path.startsWith('/leads/')) {
      const id = path.replace('/leads/', '');
      const result = await db.collection('leads').updateOne(
        { id },
        { $set: { status: body.status, updatedAt: new Date().toISOString() } }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404, headers: corsHeaders() });
      }

      return NextResponse.json({ success: true }, { headers: corsHeaders() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders() });
  }
}

export async function DELETE(request) {
  const path = getPath(request);
  const { db } = await connectToDatabase();

  try {
    // Delete activity
    if (path.startsWith('/admin/activities/')) {
      const id = path.replace('/admin/activities/', '');
      const result = await db.collection('activities').deleteOne({ id });

      if (result.deletedCount === 0) {
        return NextResponse.json({ error: 'Activity not found' }, { status: 404, headers: corsHeaders() });
      }

      return NextResponse.json({ success: true }, { headers: corsHeaders() });
    }

    // Delete blog post
    if (path.startsWith('/admin/blog/')) {
      const id = path.replace('/admin/blog/', '');
      const result = await db.collection('blog_posts').deleteOne({ id });

      if (result.deletedCount === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404, headers: corsHeaders() });
      }

      return NextResponse.json({ success: true }, { headers: corsHeaders() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders() });
  }
}
