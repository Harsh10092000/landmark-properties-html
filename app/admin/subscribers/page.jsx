"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function AdminSubscribersPage() {
  const { data: session, status } = useSession();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated') {
      setError('You must be logged in to access this page');
      setLoading(false);
      return;
    }

    fetchSubscribers();
  }, [status]);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/subscribers');
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      } else {
        setError('Failed to fetch subscribers');
      }
    } catch (error) {
      setError('Error fetching subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async (email) => {
    try {
      const response = await fetch('/api/subscribers/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Refresh the list
        fetchSubscribers();
      } else {
        setError('Failed to unsubscribe user');
      }
    } catch (error) {
      setError('Error unsubscribing user');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Subscribers Management</h3>
              <span className="badge bg-primary">{subscribers.length} subscribers</span>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {subscribers.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No subscribers found</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Subscribed Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((subscriber, index) => (
                        <tr key={subscriber.id || index}>
                          <td>{index + 1}</td>
                          <td>{subscriber.name || 'N/A'}</td>
                          <td>{subscriber.email}</td>
                          <td>
                            {subscriber.is_unsubscribed === 1 ? (
                              <span className="badge bg-danger">Unsubscribed</span>
                            ) : (
                              <span className="badge bg-success">Subscribed</span>
                            )}
                          </td>
                          <td>
                            {subscriber.created_at ? 
                              new Date(subscriber.created_at).toLocaleDateString() : 
                              'N/A'
                            }
                          </td>
                          <td>
                            {subscriber.is_unsubscribed === 0 && (
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleUnsubscribe(subscriber.email)}
                                title="Unsubscribe user"
                              >
                                Unsubscribe
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
