import styles from './HomeView.module.css';
import headerImage from '../../assets/BrainFlashHeader.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faRainbow, faPencil, faBinoculars, faPlay, faCheck, faCloudBolt } from '@fortawesome/free-solid-svg-icons'

export default function HomeView() {
  return (


    <div
      style={{

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <img
              src={headerImage}
              className={styles.headerImage}
              alt="BrainFlash header"
            />

            <div>
              <section>
                <h2>
                  Turn study time into game time.<br /><br />
                  Studying doesn't have to be boring. With BrainFlash, you can create decks, challenge yourself, and watch your memory peak — one flash at a time.<br />
                </h2>
                
                <h1>Here's what you can do:<br />
                  {/* <br /> */}
                </h1>

                {/* Features Grid */}
                <div className={styles.featuresGrid}>
                  <div className={styles.featureCard}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faKey} />
                    </div>
                    <div className={styles.text}>
                      Sign up & log in —<br />
                      your decks go<br />
                      wherever you go
                    </div>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faRainbow} />
                    </div>
                    <div className={styles.text}>
                      Build custom<br />
                      flashcard decks<br />
                      for any topic<br />
                      under the sun
                    </div>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faPencil} />
                    </div>
                    <div className={styles.text}>
                      Edit on the fly —<br />
                      change cards or<br />
                      tweak decks<br />
                      anytime
                    </div>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faBinoculars} />
                    </div>
                    <div className={styles.text}>
                      Search your cards<br />
                      when you need<br />
                      that one fact fast
                    </div>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <div className={styles.text}>
                      Hit "Study" and<br />
                      test yourself in a<br />
                      live study session
                    </div>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div className={styles.text}>
                      Mark right or<br />
                      wrong to track<br />
                      your progress in<br />
                      real time
                    </div>
                  </div>
                </div>

                <h2>
                  <FontAwesomeIcon icon={faCloudBolt} /> Ready to brain better? <br /><br />
                  <a href="/decks/createdeck">Click here</a> to start your first deck — it's free, fast, and fun.<br />
                </h2>

              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}