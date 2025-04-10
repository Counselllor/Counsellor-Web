import "./About.css";

//Section About
const SectionAbout = () => {
  return (
    <section className="section-about">
              <div className="u-center-text u-margin-bottom-large">
                <h2 className="heading-secondary">
                  Discover Your Perfect Educational Path
                </h2>
              </div>

              <div className="row">
                <div className="col-1-of-2">
                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Our mission is to empower students with knowledge and guidance,
                    helping them make informed decisions about their educational journey
                    and future career paths.
                  </h3>
                  <p className="paragraph">
                    Our platform offers a comprehensive collection of educational streams and career paths,
                    carefully curated to match students' interests, aptitudes, and professional aspirations.
                    We provide detailed information about colleges, courses, and career opportunities to help
                    students make well-informed decisions about their future.
                  </p>
                  <p className="paragraph">
                    We also feature authentic experiences and testimonials from current students and alumni,
                    offering valuable insights into college life and career trajectories. We believe that
                    education is a personal journey, and our goal is to help each student find the path that
                    best suits their unique needs and ambitions.
                  </p>
                </div>

                <div className="col-1-of-2">
                  <div className="composition">
                    <img
                      src="https://t4.ftcdn.net/jpg/05/39/10/47/360_F_539104776_BchIZKRhIUXDY0ZaVHxaoIDvRa2eAG3d.jpg"
                      alt="Group 1"
                      className="composition__grp composition__grp--p1"
                    />
                    <img
                      src="https://www.thestatesman.com/wp-content/uploads/2020/09/QT-Indian-students.jpg"
                      alt="Group 2"
                      className="composition__grp composition__grp--p2"
                    />
                    <img
                      src="https://t3.ftcdn.net/jpg/03/88/97/92/360_F_388979227_lKgqMJPO5ExItAuN4tuwyPeiknwrR7t2.jpg"
                      alt="Group 3"
                      className="composition__grp composition__grp--p3"
                    />
                  </div>
                </div>
              </div>
            </section>
  )
}

export default SectionAbout