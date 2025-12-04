"use client";
import React, { useState, useEffect } from 'react';
import { getUploadImageUrl } from '@/app/config/site';

const ImageModal = ({ isOpen, onClose, images, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, onClose]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const imageUrl = getUploadImageUrl(currentImage);

  return (
    <>
      <div 
        className="image-modal-overlay"
        onClick={onClose}
      >
        <div className="image-modal-container" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button 
            className="image-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                className="image-modal-nav image-modal-prev"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                className="image-modal-nav image-modal-next"
                onClick={goToNext}
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          {/* Image */}
          <div className="image-modal-content" onClick={handleImageClick}>
            <img 
              src={imageUrl}
              alt={`Property image ${currentIndex + 1}`}
              className="image-modal-image"
            />
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="image-modal-counter">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .image-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .image-modal-container {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 80px;
        }

        .image-modal-content {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          max-height: 100%;
        }

        .image-modal-image {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .image-modal-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10000;
        }

        .image-modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .image-modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10000;
        }

        .image-modal-nav:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
        }

        .image-modal-prev {
          left: 10px;
        }

        .image-modal-next {
          right: 10px;
        }

        .image-modal-counter {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          backdrop-filter: blur(10px);
          z-index: 10000;
        }

        @media (max-width: 768px) {
          .image-modal-overlay {
            padding: 10px;
          }

          .image-modal-nav {
            width: 40px;
            height: 40px;
          }

          .image-modal-prev {
            left: 10px;
          }

          .image-modal-next {
            right: 10px;
          }

          .image-modal-close {
            top: 10px;
            right: 10px;
            width: 35px;
            height: 35px;
          }

          .image-modal-counter {
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @media (max-width: 480px) {
          .image-modal-nav {
            width: 35px;
            height: 35px;
          }

          .image-modal-prev {
            left: 5px;
          }

          .image-modal-next {
            right: 5px;
          }
        }
      `}</style>
    </>
  );
};

export default ImageModal; 