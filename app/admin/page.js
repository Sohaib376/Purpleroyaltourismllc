'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Users, FileText, Compass, Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react';

const activityCategories = ['Adventure', 'Landmarks', 'Cruises', 'City Tours', 'Theme Parks', 'Attractions', 'Entertainment', 'Museums'];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Blog form state
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postForm, setPostForm] = useState({
    title: '', slug: '', content: '', excerpt: '', category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba', published: false
  });
  
  // Activity form state
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activityForm, setActivityForm] = useState({
    title: '', slug: '', tour_code: '', category: 'Adventure', tags: '',
    description: '', price: '', duration: '', location: 'Dubai',
    image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    featured: false, active: true
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        fetchData();
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, postsRes, activitiesRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/admin/blog'),
        fetch('/api/admin/activities')
      ]);
      
      const leadsData = await leadsRes.json().catch(() => []);
      const postsData = await postsRes.json().catch(() => []);
      const activitiesData = await activitiesRes.json().catch(() => []);
      
      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setPosts(Array.isArray(postsData) ? postsData : []);
      setActivities(Array.isArray(activitiesData) ? activitiesData : []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const seedActivities = async () => {
    try {
      const response = await fetch('/api/admin/seed-activities');
      const data = await response.json();
      alert(data.message);
      fetchData();
    } catch (err) {
      console.error('Error seeding:', err);
    }
  };

  // ===== Blog Functions =====
  const handleSavePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingPost ? `/api/admin/blog/${editingPost.id}` : '/api/admin/blog';
      const method = editingPost ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postForm),
      });
      if (response.ok) {
        setShowPostForm(false);
        setEditingPost(null);
        setPostForm({ title: '', slug: '', content: '', excerpt: '', category: 'Travel Tips', image: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba', published: false });
        fetchData();
      }
    } catch (err) {
      console.error('Error saving post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostForm({ title: post.title, slug: post.slug, content: post.content || '', excerpt: post.excerpt || '', category: post.category || 'Travel Tips', image: post.image || '', published: post.published || false });
    setShowPostForm(true);
  };

  // ===== Activity Functions =====
  const handleSaveActivity = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingActivity ? `/api/admin/activities/${editingActivity.id}` : '/api/admin/activities';
      const method = editingActivity ? 'PUT' : 'POST';
      
      const payload = {
        ...activityForm,
        tags: activityForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setShowActivityForm(false);
        setEditingActivity(null);
        setActivityForm({ title: '', slug: '', tour_code: '', category: 'Adventure', tags: '', description: '', price: '', duration: '', location: 'Dubai', image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', featured: false, active: true });
        fetchData();
      }
    } catch (err) {
      console.error('Error saving activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteActivity = async (id) => {
    if (!confirm('Delete this activity?')) return;
    await fetch(`/api/admin/activities/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setActivityForm({
      title: activity.title,
      slug: activity.slug,
      tour_code: activity.tour_code,
      category: activity.category,
      tags: activity.tags?.join(', ') || '',
      description: activity.description || '',
      price: activity.price || '',
      duration: activity.duration || '',
      location: activity.location || 'Dubai',
      image_url: activity.image_url || '',
      featured: activity.featured || false,
      active: activity.active !== false
    });
    setShowActivityForm(true);
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0cc0df] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 mt-2">Enter password to access dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-[#0cc0df] text-white py-3 rounded-lg font-medium hover:bg-[#0ab0cd] transition disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <button onClick={() => { localStorage.removeItem('adminAuth'); setIsAuthenticated(false); }} className="text-gray-500 hover:text-gray-700">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setActiveTab('leads')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'leads' ? 'bg-[#0cc0df] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
            <Users size={18} /> Leads ({leads.length})
          </button>
          <button onClick={() => setActiveTab('activities')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'activities' ? 'bg-[#0cc0df] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
            <Compass size={18} /> Activities ({activities.length})
          </button>
          <button onClick={() => setActiveTab('blog')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'blog' ? 'bg-[#0cc0df] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
            <FileText size={18} /> Blog ({posts.length})
          </button>
        </div>

        {/* ===== LEADS TAB ===== */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No leads yet</td></tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id}>
                        <td className="px-4 py-4 text-gray-900">{lead.name}</td>
                        <td className="px-4 py-4 text-gray-600">{lead.phone}</td>
                        <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{lead.service}</span></td>
                        <td className="px-4 py-4 text-gray-600 text-sm">{lead.source}</td>
                        <td className="px-4 py-4"><span className={`px-2 py-1 rounded text-xs ${lead.status === 'new' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{lead.status}</span></td>
                        <td className="px-4 py-4 text-gray-500 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== ACTIVITIES TAB ===== */}
        {activeTab === 'activities' && (
          <div>
            <div className="flex justify-between mb-4">
              <button onClick={seedActivities} className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition">
                <RefreshCw size={18} /> Seed Activities
              </button>
              <button onClick={() => { setEditingActivity(null); setActivityForm({ title: '', slug: '', tour_code: '', category: 'Adventure', tags: '', description: '', price: '', duration: '', location: 'Dubai', image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', featured: false, active: true }); setShowActivityForm(true); }} className="flex items-center gap-2 bg-[#0cc0df] text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-600 transition">
                <Plus size={18} /> New Activity
              </button>
            </div>

            {showActivityForm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{editingActivity ? 'Edit Activity' : 'Create New Activity'}</h2>
                  <button onClick={() => setShowActivityForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                <form onSubmit={handleSaveActivity} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                      <input type="text" value={activityForm.title} onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tour Code *</label>
                      <input type="text" value={activityForm.tour_code} onChange={(e) => setActivityForm({ ...activityForm, tour_code: e.target.value.toUpperCase() })} placeholder="PR001" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select value={activityForm.category} onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none">
                        {activityCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                      <input type="text" value={activityForm.price} onChange={(e) => setActivityForm({ ...activityForm, price: e.target.value })} placeholder="AED 150" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input type="text" value={activityForm.duration} onChange={(e) => setActivityForm({ ...activityForm, duration: e.target.value })} placeholder="6 Hours" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input type="text" value={activityForm.location} onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                    <input type="text" value={activityForm.tags} onChange={(e) => setActivityForm({ ...activityForm, tags: e.target.value })} placeholder="Evening, BBQ, 4x4" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="url" value={activityForm.image_url} onChange={(e) => setActivityForm({ ...activityForm, image_url: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={activityForm.description} onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" />
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={activityForm.featured} onChange={(e) => setActivityForm({ ...activityForm, featured: e.target.checked })} className="w-4 h-4 text-[#0cc0df] rounded" />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={activityForm.active} onChange={(e) => setActivityForm({ ...activityForm, active: e.target.checked })} className="w-4 h-4 text-[#0cc0df] rounded" />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0cc0df] text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-600 transition disabled:opacity-50">
                      <Save size={18} /> {loading ? 'Saving...' : 'Save Activity'}
                    </button>
                    <button type="button" onClick={() => setShowActivityForm(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activities.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No activities. Click "Seed Activities" to add sample data.</td></tr>
                  ) : (
                    activities.map((activity) => (
                      <tr key={activity.id}>
                        <td className="px-4 py-4">
                          <div className="text-gray-900 font-medium">{activity.title}</div>
                          <div className="text-gray-500 text-xs">{activity.location}</div>
                        </td>
                        <td className="px-4 py-4 font-mono text-sm">{activity.tour_code}</td>
                        <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{activity.category}</span></td>
                        <td className="px-4 py-4 text-[#0cc0df] font-semibold">{activity.price}</td>
                        <td className="px-4 py-4">
                          <div className="flex gap-1">
                            {activity.featured && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Featured</span>}
                            <span className={`px-2 py-1 rounded text-xs ${activity.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{activity.active ? 'Active' : 'Inactive'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditActivity(activity)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                            <button onClick={() => handleDeleteActivity(activity.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== BLOG TAB ===== */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingPost(null); setPostForm({ title: '', slug: '', content: '', excerpt: '', category: 'Travel Tips', image: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba', published: false }); setShowPostForm(true); }} className="flex items-center gap-2 bg-[#0cc0df] text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-600 transition">
                <Plus size={18} /> New Post
              </button>
            </div>

            {showPostForm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
                  <button onClick={() => setShowPostForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                <form onSubmit={handleSavePost} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input type="text" value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select value={postForm.category} onChange={(e) => setPostForm({ ...postForm, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none">
                        <option>Travel Tips</option><option>Visa Tips</option><option>Umrah</option><option>Dubai</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="url" value={postForm.image} onChange={(e) => setPostForm({ ...postForm, image: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                    <input type="text" value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML)</label>
                    <textarea value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} rows={6} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0cc0df] outline-none" />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={postForm.published} onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })} className="w-4 h-4 text-[#0cc0df] rounded" />
                    <span className="text-sm text-gray-700">Published</span>
                  </label>
                  <div className="flex gap-3">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0cc0df] text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-600 transition disabled:opacity-50">
                      <Save size={18} /> {loading ? 'Saving...' : 'Save Post'}
                    </button>
                    <button type="button" onClick={() => setShowPostForm(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.length === 0 ? (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No blog posts yet.</td></tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-4 py-4"><div className="text-gray-900 font-medium">{post.title}</div><div className="text-gray-500 text-xs">/{post.slug}</div></td>
                        <td className="px-4 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs">{post.category}</span></td>
                        <td className="px-4 py-4"><span className={`px-2 py-1 rounded text-xs ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{post.published ? 'Published' : 'Draft'}</span></td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditPost(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                            <button onClick={() => handleDeletePost(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
