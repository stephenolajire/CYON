import React, {useEffect} from 'react'
import style from '../style/OurHistory.module.css'
import AOS from "aos";
import "aos/dist/aos.css";

const OurHistory = () => {
  useEffect(() => {
      AOS.init({
        duration: 1000, // Animation duration
        once: false, // Ensures the animation runs only once
      });
    }, []);
  return (
    <div className={style.container}>
      <div className={style.header} data-aos="fade-up">
        <h1 className={style.historyOne}>Our History</h1>
        <h1 className={style.intro}>Introduction</h1>
        <p className={style.historyText}>
          The Catholic Youth Organization of Nigeria (CYON) is the official
          youth arm of the Catholic Church in Nigeria, bringing together young
          Catholics from different parishes and dioceses. It plays a significant
          role in the spiritual, social, and moral development of Catholic
          youths, preparing them for leadership within the Church and society.
        </p>
      </div>
      <div className={style.header} data-aos="fade-up">
        <h1 className={style.history}>Origins and Early Development</h1>
        <p className={style.historyText}>
          The history of CYON can be traced back to the early 1950s and 1960s, a
          period when various youth movements existed in different parishes
          across Nigeria. The Catholic Church, recognizing the need for an
          organized structure to guide the spiritual and moral lives of young
          people, sought to unify these youth groups under one umbrella. In
          1985, during the tenure of Pope John Paul II, the Catholic Bishops
          Conference of Nigeria (CBCN) officially recognized and established
          CYON as a national organization. This move was inspired by the global
          emphasis on youth empowerment within the Catholic Church, particularly
          after the introduction of World Youth Day in 1985 by Pope John Paul
          II.
        </p>
      </div>
      <div className={style.header} data-aos="fade-up">
        <h1 className={style.history}>Structure and Organization</h1>
        <p className={style.historyText}>CYON operates at four major levels:</p>
        <ul className={style.list}>
          <li className={style.historyText}>
            <span>Parish Level:</span> At the grassroots level, CYON members
            participate in various parish activities, including Bible study,
            prayer meetings, and community service projects.
          </li>
          <li className={style.historyText}>
            <span>Deanery Level:</span> CYON members from different parishes
            within a deanery come together for joint activities, retreats, and
            spiritual formation programs.
          </li>
          <li className={style.historyText}>
            <span>Diocesan Level:</span> The diocesan CYON coordinates
            activities across parishes within a diocese, organizing conferences,
            seminars, and outreach programs.
          </li>
          <li className={style.historyText}>
            <span>National Level:</span> The national CYON oversees the
            organization's activities at the national level, including
            coordinating national conferences, pilgrimages, and youth
            empowerment initiatives.
          </li>
        </ul>
        <p className={style.historyText}>
          CYON is governed by a National Executive Council (NEC) comprising
          elected representatives from different dioceses. The NEC is
          responsible for setting policies, organizing national events, and
          representing the interests of CYON members at the national level.
        </p>
      </div>
      <div className={style.header} data-aos="fade-up">
        <h1 className={style.history}>Our Mission and Objectives</h1>
        <p className={style.historyText}>
          CYON's mission is to foster the spiritual growth, leadership
          development, and social responsibility of young Catholics in Nigeria.
          The organization aims to achieve this mission by:
        </p>

        <ul className={style.list}>
          <li className={style.historyText}>
            <span>Providing Spiritual Formation:</span> CYON organizes retreats,
            seminars, and prayer sessions to deepen members' faith and
            understanding of Catholic teachings.
          </li>
          <li className={style.historyText}>
            <span>Promoting Social Justice:</span> CYON engages in community
            service projects, advocacy campaigns, and outreach programs to
            address social issues and promote human dignity.
          </li>
          <li className={style.historyText}>
            <span>Empowering Youth Leaders:</span> CYON offers leadership
            training, mentorship programs, and opportunities for young Catholics
            to develop their skills and talents.
          </li>
          <li  className={style.historyText}>
            <span>Fostering Fellowship and Unity:</span> CYON creates a sense of
            community and belonging among young Catholics, encouraging
            friendship, collaboration, and mutual support.
          </li>
          <li className={style.historyText}>
            <span>Evangelizing and Witnessing:</span> CYON members are
            encouraged to share their faith, evangelize in their communities,
            and serve as positive role models for other young people.
          </li>
        </ul>
      </div>
      <div className={style.header}  data-aos="fade-up">
        <h1 className={style.history}>Conclusion</h1>
        <p className={style.historyText}>
          Over the years, CYON has grown into a vibrant and dynamic organization
          with a strong presence in Nigerian Catholic communities. The
          organization continues to inspire and empower young Catholics, helping
          them live out their faith, serve others, and make a positive impact on
          society. As CYON looks to the future, it remains committed to its
          mission of nurturing the next generation of Catholic leaders and
          fostering a spirit of faith, service, and unity among young people in
          Nigeria.
        </p>
      </div>
    </div>
  );
}

export default OurHistory
