import React from "react";

const experiences = [
  {
    year: "2026",
    range: "Jan 2026 — Mar 2026",
    role: "Full Stack Developer",
    company: "JOYN",
    location: "Denmark",
    bullets: [],
  },
  {
    year: "2025",
    range: "Oct 2025",
    role: "Developer — Volunteer",
    company: "Ignite Odense",
    location: "Odense, DK",
    bullets: [
      "Monitored performance and errors for an app used by attendees, during one of the largest startup networking events in Odense.",
    ],
  },
  {
    year: "2025",
    range: "Sep 2025 — Dec 2025",
    role: "Full Stack Developer — Internship",
    company: "JOYN",
    location: "Denmark",
    bullets: [
      "Developed components and built custom hooks with Next.js, TypeScript and Tanstack Query. Developed endpoints with Fastify and integration tests with Jest.",
      "Horizontally scaled VMs with sharding, reducing build & test time for the GitHub Actions workflow from 8 to 2 minutes.",
      "Implemented and configured PostHog for logging errors across all platforms.",
      "Maintained and deployed npm packages for internally developed libraries used by the platform.",
    ],
  },
  {
    year: "2024",
    range: "Oct 2024 — Jan 2025",
    role: "Thesis",
    company: "BSS",
    location: "Denmark",
    bullets: [
      "Designed and developed the backend for a sensor monitoring system capable of detecting drones and sending event logs to a frontend web app built by a fellow student.",
      "Built SignalR integration to stream real-time event logs to the frontend over a WebSocket connection.",
      "Ensured quality through unit, integration, and acceptance testing, run via a CI pipeline on GitHub Actions.",
    ],
  },
  {
    year: "2024",
    range: "Jul 2024 — Oct 2024",
    role: "Backend Developer — Internship",
    company: "BSS",
    location: "Denmark",
    bullets: [
      "Developed APIs in .NET with EF Core.",
      "Wrote API documentation with Swagger.",
      "Monitored the backend with Azure Application Insights for debugging purposes.",
    ],
  },
];

const education = [
  {
    range: "Aug 2022 — Jan 2025",
    degree: "Datamatiker — AP Computer Science",
    school: "UCL Odense",
  },
];

const certifications = ["Microsoft Certified: Fundamentals"];

const languages = [
  { name: "Danish", level: "Fluent" },
  { name: "English", level: "Fluent" },
];

export default function Resume() {
  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .resume-root { font-family: 'IBM Plex Sans', sans-serif; }
        .resume-root a { color: inherit; }
      `}</style>

      <div className="resume-root" style={styles.sheet}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.name}>Mohamed Shil</h1>
            <p style={styles.title}>Software Developer</p>
          </div>
          <div style={styles.contact}>
            <span>maxamed-14@outlook.dk</span>
            <span>·</span>
            <span>github.com/Moha2088</span>
            <span>·</span>
            <span>linkedin.com/in/mohamed-shil</span>
            <span>·</span>
            <span>Odense, DK</span>
          </div>
        </header>

        <div style={styles.headerRule} />

        {/* Summary */}
        <section style={{ marginTop: "1.75rem" }}>
          <SectionLabel text="Summary" />
          <p style={styles.summary}>
            Software developer with interest and experience in full-stack
            development. Through study and work experience I've built skills
            with C#, .NET, TypeScript, React.js, and Next.js — and having been
            exposed to many technologies, I'm not afraid to dive into new
            ones.
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginTop: "2.25rem" }}>
          <SectionLabel text="Work Experience" />

          <div style={styles.timeline}>
            <div style={styles.timelineSpine} />

            {experiences.map((exp, i) => (
              <div key={i} style={styles.timelineRow}>
                <div style={styles.timelineRail}>
                  <span style={styles.timelineYear}>{exp.year}</span>
                  <span style={styles.timelineDot} />
                </div>

                <div
                  style={{
                    ...styles.timelineContent,
                    paddingBottom:
                      i === experiences.length - 1 ? 0 : "2.25rem",
                  }}
                >
                  <div style={styles.entryHead}>
                    <h3 style={styles.role}>{exp.role}</h3>
                    <span style={styles.range}>{exp.range}</span>
                  </div>
                  <p style={styles.company}>
                    {exp.company} <span style={styles.dot}>·</span>{" "}
                    <span style={styles.location}>{exp.location}</span>
                  </p>
                  {exp.bullets.length > 0 && (
                    <ul style={styles.bullets}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} style={styles.bullet}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={{ marginTop: "2.25rem" }}>
          <SectionLabel text="Education" />
          {education.map((ed, i) => (
            <div key={i} style={styles.eduRow}>
              <div>
                <h3 style={styles.role}>{ed.degree}</h3>
                <p style={styles.company}>{ed.school}</p>
              </div>
              <span style={styles.range}>{ed.range}</span>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section style={{ marginTop: "2.25rem" }}>
          <SectionLabel text="Certifications" />
          <p style={styles.skills}>{certifications.join(", ")}</p>
        </section>

        {/* Languages */}
        <section style={{ marginTop: "2.25rem" }}>
          <SectionLabel text="Languages" />
          <div style={styles.languagesRow}>
            {languages.map((l, i) => (
              <span key={i} style={styles.languageItem}>
                {l.name} <span style={styles.dot}>·</span>{" "}
                <span style={styles.location}>{l.level}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section style={{ marginTop: "2.25rem", marginBottom: "0.5rem" }}>
          <SectionLabel text="Skills" />
          <p style={styles.skills}>
            C#, .NET, TypeScript, React.js, Next.js, Tanstack Query, Fastify,
            Jest, SignalR, GitHub Actions, Azure Application Insights, Swagger
          </p>
        </section>
      </div>
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={styles.sectionLabelRow}>
      <span style={styles.sectionLabel}>{text}</span>
      <div style={styles.sectionLabelLine} />
    </div>
  );
}

const INK = "#1B1E23";
const MUTED = "#5B6259";
const ACCENT = "#234E44";
const RULE = "#DADED8";
const PAPER = "#F6F5F1";

const styles = {
  page: {
    background: PAPER,
    minHeight: "100vh",
    padding: "2.5rem 1rem",
    display: "flex",
    justifyContent: "center",
  },
  sheet: {
    width: "100%",
    maxWidth: "700px",
    color: INK,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  name: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 600,
    fontSize: "2.1rem",
    letterSpacing: "-0.01em",
    margin: 0,
  },
  title: {
    margin: "0.25rem 0 0",
    fontSize: "0.95rem",
    color: ACCENT,
    fontWeight: 500,
  },
  contact: {
    display: "flex",
    gap: "0.4rem",
    flexWrap: "wrap",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.72rem",
    color: MUTED,
    letterSpacing: "0.01em",
  },
  headerRule: {
    height: "1px",
    background: INK,
    marginTop: "1.25rem",
  },
  summary: {
    fontSize: "0.88rem",
    lineHeight: 1.6,
    color: "#33383B",
    margin: 0,
    maxWidth: "56ch",
  },
  sectionLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1.25rem",
  },
  sectionLabel: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: ACCENT,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  sectionLabelLine: {
    flex: 1,
    height: "1px",
    background: RULE,
  },
  timeline: {
    position: "relative",
  },
  timelineSpine: {
    position: "absolute",
    left: "3.1rem",
    top: "0.4rem",
    bottom: "0.4rem",
    width: "1px",
    background: RULE,
  },
  timelineRow: {
    display: "flex",
    gap: "1.25rem",
  },
  timelineRail: {
    width: "3.1rem",
    flexShrink: 0,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  timelineYear: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.72rem",
    color: MUTED,
    marginTop: "0.15rem",
    marginRight: "0.5rem",
  },
  timelineDot: {
    position: "absolute",
    left: "-0.2rem",
    top: "0.35rem",
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: ACCENT,
    border: `2px solid ${PAPER}`,
    boxShadow: `0 0 0 1px ${ACCENT}`,
  },
  timelineContent: {
    flex: 1,
  },
  entryHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "0.25rem 0.75rem",
  },
  role: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 600,
    fontSize: "1.05rem",
    margin: 0,
  },
  range: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.72rem",
    color: MUTED,
    whiteSpace: "nowrap",
  },
  company: {
    margin: "0.15rem 0 0.6rem",
    fontSize: "0.88rem",
    color: ACCENT,
    fontWeight: 500,
  },
  location: {
    color: MUTED,
    fontWeight: 400,
  },
  dot: {
    color: MUTED,
  },
  bullets: {
    margin: 0,
    paddingLeft: "1.1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },
  bullet: {
    fontSize: "0.87rem",
    lineHeight: 1.5,
    color: "#33383B",
  },
  eduRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "0.25rem 0.75rem",
  },
  languagesRow: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  languageItem: {
    fontSize: "0.88rem",
    color: "#33383B",
  },
  skills: {
    fontSize: "0.87rem",
    lineHeight: 1.6,
    color: "#33383B",
    margin: 0,
  },
};
