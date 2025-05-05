import React from "react";
import "./CareerSupportSkeleton.css";

const CareerSupportSkeleton = () => {
  return (
    <div className="career-support-skeleton">
      {/* Header Section Skeleton */}
      <div className="career-support-skeleton__header">
        <div className="career-support-skeleton__main-title"></div>
        <div className="career-support-skeleton__subtitle"></div>
      </div>

      {/* Services Section Skeleton */}
      <div className="career-support-skeleton__content">
        <div className="career-support-skeleton__title"></div>
        <div className="career-support-skeleton__services">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="service-skeleton-card">
              <div className="service-skeleton-card__icon"></div>
              <div className="service-skeleton-card__title"></div>
              <div className="service-skeleton-card__description"></div>
              <div className="service-skeleton-card__description"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section Skeleton */}
      <div className="career-support-skeleton__pricing">
        <div className="career-support-skeleton__pricing-title"></div>
        <div className="pricing-skeleton-cards">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="pricing-skeleton-card">
              <div className="pricing-skeleton-card__title"></div>
              <div className="pricing-skeleton-card__price"></div>
              <div className="pricing-skeleton-card__features">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="pricing-skeleton-card__feature"></div>
                ))}
              </div>
              <div className="pricing-skeleton-card__button"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section Skeleton */}
      <div className="career-support-skeleton__form-section">
        <div className="career-support-skeleton__form-title"></div>
        <div className="career-support-skeleton__form">
          <div className="form-skeleton-group">
            <div className="form-skeleton-label"></div>
            <div className="form-skeleton-input"></div>
          </div>
          <div className="form-skeleton-group">
            <div className="form-skeleton-label"></div>
            <div className="form-skeleton-input"></div>
          </div>
          <div className="form-skeleton-group">
            <div className="form-skeleton-label"></div>
            <div className="form-skeleton-textarea"></div>
          </div>
          <div className="form-skeleton-submit"></div>
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="career-support-skeleton__cta">
        <div className="career-support-skeleton__cta-title"></div>
        <div className="career-support-skeleton__cta-text"></div>
        <div className="career-support-skeleton__cta-button"></div>
      </div>
    </div>
  );
};

export default CareerSupportSkeleton;
