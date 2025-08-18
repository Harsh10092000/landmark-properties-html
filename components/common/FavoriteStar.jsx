"use client";
import React, { useState, useEffect } from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

const FavoriteStar = ({ propertyId, userId, propertyUserId, initialFavorited = false, size = 24, className = "" }) => {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // Check if user is logged in
  const isLoggedIn = userId && userId !== "";

  // Check if property is listed by current user
  const isOwnProperty = userId && propertyUserId && String(userId) === String(propertyUserId);

  // Check favorite status when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!isLoggedIn || !propertyId) return;

      try {
        const response = await fetch(`/api/favorites/toggle?userId=${userId}&propertyId=${propertyId}`);
        if (response.ok) {
          const data = await response.json();
          setIsFavorited(data.isFavorited);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [userId, propertyId, isLoggedIn]);

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      // Show login popup instead of alert
      setShowLoginPopup(true);
      // Auto-hide popup after 3 seconds
      setTimeout(() => setShowLoginPopup(false), 3000);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId,
          userId,
          action: isFavorited ? 'remove' : 'add'
        }),
      });

      if (response.ok) {
        setIsFavorited(!isFavorited);
        // Show success message
        if (!isFavorited) {
          console.log('Added to favorites');
        } else {
          console.log('Removed from favorites');
        }
      } else {
        console.error('Failed to toggle favorite');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StarIcon = isFavorited ? IconStarFilled : IconStar;
  const starColor = isFavorited ? "#FFD700" : "#FFFFFF";

  // Don't render star if property is listed by current user
  if (isOwnProperty) {
    return null;
  }

  return (
    <div className="position-relative">
      <button
        onClick={handleToggleFavorite}
        disabled={isLoading}
        className={`favorite-star-btn ${className}`}
        style={{
          background: 'none',
          border: 'none',
          cursor: isLoggedIn ? 'pointer' : 'pointer',
          padding: '4px 6px',
          borderRadius: '50%',
          transition: 'all 0.2s ease',
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
        }}
        title={isLoggedIn ? (isFavorited ? 'Remove from favorites' : 'Add to favorites') : 'Login to save favorites'}
      >
        <StarIcon
          size={size}
          color={starColor}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          }}
        />
      </button>

      {/* Login Required Popup */}
      {showLoginPopup && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '-10px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            fontSize: '14px',
            color: '#333',
            whiteSpace: 'nowrap',
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span>🔒</span>
            <span>Login required to save favorites</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a 
              href="/login" 
              style={{
                display: 'inline-block',
                background: '#0a3d2c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.18s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                minWidth: '120px',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#0d5c3b';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#0a3d2c';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
              }}
            >
              Login Now
            </a>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              right: '20px',
              width: '12px',
              height: '12px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderBottom: 'none',
              borderRight: 'none',
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FavoriteStar;
