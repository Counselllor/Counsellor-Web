import "./About.css";

//Section About
const SectionAbout = () => {
  return (
    <section className="section-about">
              <div className="u-center-text u-margin-bottom-large">
                <h2 className="heading-secondary">
                  Behold For What We Present You
                </h2>
              </div>

              <div className="row">
                <div className="col-1-of-2">
                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Our mission? To bestow upon students the gift of wisdom,
                    aiding them in their quest for undergraduate enlightenment.
                    Prepare to witness the extraordinary!
                  </h3>
                  <p className="paragraph">
                    Within these virtual walls, students will uncover a treasure
                    trove of streams and branches, carefully curated to match
                    their very souls, their passions, and their wildest career
                    aspirations. No stone shall be left unturned, no path left
                    unexplored! But wait, dear traveler, there&apos;s more! We bring
                    forth the whispers of the present, the tales of those who
                    have embarked on this hallowed journey before you. Hear the
                    unfiltered truths, the real-life sagas, as they guide you
                    towards the perfect college. For in the realm of education,
                    one size does not fit all. Let your desires and preferences
                    reign supreme!
                  </p>
                </div>

                <div className="col-1-of-2">
                  <div className="composition">
                    <img
                      src="https://t4.ftcdn.net/jpg/05/39/10/47/360_F_539104776_BchIZKRhIUXDY0ZaVHxaoIDvRa2eAG3d.jpg"
                      alt="photo 1"
                      className="composition__grp composition__grp--p1"
                    />
                    <img
                      src="https://www.thestatesman.com/wp-content/uploads/2020/09/QT-Indian-students.jpg"
                      alt="photo 2"
                      className="composition__grp composition__grp--p2"
                    />
                    <img
                      src="https://t3.ftcdn.net/jpg/03/88/97/92/360_F_388979227_lKgqMJPO5ExItAuN4tuwyPeiknwrR7t2.jpg"
                      alt="photo 3"
                      className="composition__grp composition__grp--p3"
                    />
                  </div>
                </div>
              </div>
            </section>
  )
}

export default SectionAbout