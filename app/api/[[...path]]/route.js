import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

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

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const path = getPath(request);
  const { db } = await connectToDatabase();

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
