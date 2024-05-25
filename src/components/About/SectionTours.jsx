import React from 'react';
import "./About.css";

//Section Tours
const SectionTours = () => {
  return (
    <section class="section-tours">
    <div class="u-center-text u-margin-bottom-large">
      <h2 class="heading-secondary">Happy Statistics</h2>
    </div>

    <div class="row">
      <div class="col-1-of-3">
        <div class="card">
          <div class="card__side card__side--front">
            <div class="card__picture card__picture--1">&nbsp;</div>
            <h4 class="card__heading">
              <span class="card__heading-span card__heading-span--1">
                Indian Colleges
              </span>
            </h4>
            <div class="card__details">
              <ul>
                <li>3000+</li>
                <li>Up to 500 Students</li>
                <li>5 Guides</li>
                <li>Choose Top Notch</li>
                <li>Feedback: 5+ Stars</li>
              </ul>
            </div>
          </div>
          <div class="card__side card__side--back card__side--back-1">
            <div class="card__cta">
              <div class="card__price-box">
                <p class="card__price-only">Explore Colleges</p>
                <p class="card__price-value">3000+</p>
              </div>
              <a href="#popup" class="btn_ btn--white">
                Explore Now!
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1-of-3">
        <div class="card">
          <div class="card__side card__side--front">
            <div class="card__picture card__picture--2">&nbsp;</div>
            <h4 class="card__heading">
              <span class="card__heading-span card__heading-span--2">
                American Colleges
              </span>
            </h4>
            <div class="card__details">
              <ul>
                <li>300+</li>
                <li>Up to 40 Students</li>
                <li>6 Guides</li>
                <li>Fits Best For You</li>
                <li>Feedback: 4+ Stars</li>
              </ul>
            </div>
          </div>
          <div class="card__side card__side--back card__side--back-2">
            <div class="card__cta">
              <div class="card__price-box">
                <p class="card__price-only">Explore Colleges</p>
                <p class="card__price-value">300+</p>
              </div>
              <a href="#popup" class="btn_ btn--white">
                Explore Now!
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1-of-3">
        <div class="card">
          <div class="card__side card__side--front">
            <div class="card__picture card__picture--3">&nbsp;</div>
            <h4 class="card__heading">
              <span class="card__heading-span card__heading-span--3">
                Austrian Colleges
              </span>
            </h4>
            <div class="card__details">
              <ul>
                <li>100+</li>
                <li>Up to 15 Students</li>
                <li>3 Guides</li>
                <li>Go Worldwide</li>
                <li>Feedback: 4+ Stars</li>
              </ul>
            </div>
          </div>
          <div class="card__side card__side--back card__side--back-3">
            <div class="card__cta">
              <div class="card__price-box">
                <p class="card__price-only">Explore Colleges</p>
                <p class="card__price-value">100+</p>
              </div>
              <a href="#popup" class="btn_ btn--white">
                Explore Now!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="u-center-text u-margin-top-huge">
      <a href="./dashboard" class="btn_ btn--green">
        Discover All
      </a>
    </div>
  </section>
  )
}

export default SectionTours