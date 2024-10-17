import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1> About MyFresh </h1>
        <p>
          Welcome to MyFresh your go-to online marketplace for the freshest and
          healthiest organic produce in Fargo, North Dakota. We are passionate
          about connecting local farmers with health-conscious consumers,
          ensuring you have access to high-quality fruits and vegetables grown
          sustainably and responsibly.{" "}
        </p>
        <p>
          MyFresh was created with a simple mission: to support local
          agriculture while making fresh, organic produce easily accessible to
          everyone. Our platform empowers local farmers to sell their products
          directly to you, without the middleman. This not only ensures
          freshness but also helps farmers receive a fair price for their hard
          work.
        </p>{" "}
        <h3>Why Choose MyFresh? </h3>
        <h4>
          <li>Farm-to-Table: </li>
        </h4>
        We prioritize freshness by partnering directly with local farmers,
        meaning your produce is harvested and delivered quickly.{" "}
        <h4>
          <li>Sustainability:</li>
        </h4>{" "}
        Our commitment to the environment is reflected in how we source,
        package, and deliver every order, minimizing waste and promoting
        eco-friendly practices.
        <h4>
          <li>Community-Driven:</li>
        </h4>{" "}
        By shopping with MyFresh, you support local farmers and contribute to a
        healthier community.{" "}
        <h4>
          <li>Convenience:</li>
        </h4>{" "}
        With our easy-to-use platform, you can browse, order, and have your
        fresh produce delivered right to your door.{" "}
        <p>
          <h3>Meet Our Founder Papa Dienou Faye</h3>
        </p>
        <p>
          Dienou Faye, the founder of MyFresh, has a passion for both technology
          and healthy living. With over a decade of experience in business
          development and digital marketing, Papa combined his skills to create
          a platform that brings people and their food sources closer together.
          Based in Fargo, Papa is committed to fostering local agriculture and
          building a healthier future, one fresh product at a time.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
