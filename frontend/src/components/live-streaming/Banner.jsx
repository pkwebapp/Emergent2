"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const Banner = ({ fallbackImage, backgroundVideo, title, description, eyebrow }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <HeroSection>
      <VideoBackground>
        {!videoLoaded && (
          <Image
            src={fallbackImage}
            alt="Loading Preview"
            fill
            className="object-cover z-0"
            priority
          />
        )}

        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          style={{ display: videoLoaded ? "block" : "none" }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoBackground>

      <Content>
        <Title>{title}</Title>
        <Rule />
        <Description>{description}</Description>
      </Content>
      <ScrollCue aria-hidden="true">
        <span>Scroll</span>
        <ScrollLine />
      </ScrollCue>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  height: 82vh;
  min-height: 560px;
  width: 100%;
  position: relative;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  /* Cinematic gradient — top vignette + rich bottom for text contrast */
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(22,21,20, 0.55) 0%, rgba(22,21,20, 0) 22%, rgba(22,21,20, 0) 55%, rgba(22,21,20, 0.85) 100%),
      linear-gradient(90deg, rgba(22,21,20, 0.45) 0%, rgba(22,21,20, 0) 55%);
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    height: 78vh;
    min-height: 520px;
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* Left-anchored, restrained content block */
const Content = styled.div`
  position: relative;
  z-index: 2;
  margin-top: auto;
  padding: 0 3.5rem 4.5rem;
  max-width: 780px;
  align-self: flex-start;

  @media (max-width: 1024px) {
    padding: 0 2rem 3rem;
    max-width: 640px;
  }

  @media (max-width: 640px) {
    padding: 0 1.25rem 2.25rem;
  }
`;

/* Thin uppercase eyebrow — sets a refined tone */
const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.68rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 1.4rem;

  @media (max-width: 640px) {
    font-size: 0.6rem;
    margin-bottom: 1rem;
    letter-spacing: 0.28em;
  }
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #FF5B22;
  box-shadow: 0 0 0 4px rgba(255,91,34, 0.18);
`;

/* Elegant editorial-scale title — no more shouting */
const Title = styled.h1`
  font-size: clamp(1.7rem, 2.6vw, 2.6rem);
  font-weight: 500;
  line-height: 1.14;
  letter-spacing: -0.015em;
  margin: 0;
  color: #ffffff;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
  max-width: 22ch;

  @media (max-width: 640px) {
    max-width: 18ch;
  }
`;

/* Small horizontal rule as a design accent between title and description */
const Rule = styled.span`
  display: block;
  width: 44px;
  height: 1px;
  background: rgba(255, 255, 255, 0.55);
  margin: 1.4rem 0 1.2rem;

  @media (max-width: 640px) {
    margin: 1.1rem 0 0.95rem;
    width: 36px;
  }
`;

const Description = styled.p`
  font-size: 0.98rem;
  line-height: 1.62;
  color: rgba(255, 255, 255, 0.82);
  max-width: 52ch;
  font-weight: 300;

  @media (max-width: 640px) {
    font-size: 0.9rem;
    line-height: 1.55;
  }
`;

const ScrollCue = styled.div`
  position: absolute;
  right: 3.5rem;
  bottom: 4.5rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  span {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 0.6rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ScrollLine = styled.span`
  width: 1px;
  height: 56px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0));
`;

export default Banner;
