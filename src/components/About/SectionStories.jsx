import React from 'react';
import "./About.css";

//Section Stories
const SectionStories = () => {
  return (
    <section class="section-stories">
              <div class="bg-video">
                <video class="bg-video__content" autoplay muted loop>
                  <source src="img/video.mp4" type="video/mp4" />
                  <source src="img/video.webm" type="video/webm" />
                  Your browser is not supported!
                </video>
              </div>
              <div class="u-center-text u-margin-bottom-large">
                <h2 class="heading-secondary">
                  We Make People Genuinely Happy
                </h2>
              </div>

              <div class="row">
                <div class="story">
                  <figure class="story__shape">
                    <img
                      src="https://bsa.web.unc.edu/wp-content/uploads/sites/14595/2019/10/kushal_student_profile.jpg"
                      alt="Person on a Tour"
                      class="story__img"
                    />
                    <figcaption class="story__caption">Mary Smith</figcaption>
                  </figure>

                  <div class="story__text">
                    <h3 class="heading-tertiary u-margin-bottom-small">
                      I got the best college with their guidance
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vitae voluptatibus accusantium esse quibusdam repellat
                      molestiae a modi non, incidunt nisi minus labore quas
                      blanditiis mollitia autem sapiente sint laboriosam fugiat?
                    </p>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="story">
                  <figure class="story__shape">
                    <img
                      src="https://img.freepik.com/free-photo/young-man-student-with-notebooks-showing-thumb-up-approval-smiling-satisfied-blue-studio-background_1258-65334.jpg"
                      alt="Person on a Tour"
                      class="story__img"
                    />
                    <figcaption class="story__caption">Jack Wilson</figcaption>
                  </figure>

                  <div class="story__text">
                    <h3 class="heading-tertiary u-margin-bottom-small">
                      Wow! My life is completely different now
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vitae voluptatibus accusantium esse quibusdam repellat
                      molestiae a modi non, incidunt nisi minus labore quas
                      blanditiis mollitia autem sapiente sint laboriosam fugiat?
                    </p>
                  </div>
                </div>
              </div>
            </section>
  )
}

export default SectionStories