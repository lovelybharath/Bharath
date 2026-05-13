import { useState } from "react";

// ─── Theme ────────────────────────────────────────────────────────────────────
const C = {
  red: "#BD0004",
  redHover: "#9a0003",
  redLight: "#fdf0f0",
  redMid: "#e8b0b2",
  gray: "#4E4E4E",
  grayLight: "#f7f7f7",
  grayMid: "#e0e0e0",
  grayDark: "#2a2a2a",
  white: "#ffffff",
  green: "#15803d",
  greenLight: "#e6f9f0",
  blue: "#1a56db",
  blueLight: "#e8f0fe",
  orange: "#b45309",
  orangeLight: "#fff3e0",
};

// ─── Default Data ─────────────────────────────────────────────────────────────
const DEFAULT_STUDENT = {
  initials: "BK",
  name: "BharathKumar",
  role: "Software Developer",
  email: "Bharath@college.edu",
  phone: "+91 98765 43210",
  linkedin: "www.linkedin.com/in/bharathkumarm1",
  college: "Bishop heber college",
  degree: "Master of computer Application",
  year: "2025",
  location: "Trichy, Tamil Nadu",
  resumeUrl: "#",
  profileCompletion: 82,
  hiringScore: 84,
  hiringLabel: "Strong candidate · Ready for interviews",
  careerInterests: [
    { id: 1, label: "Construction Project Management" },
    { id: 2, label: "BIM Coordination & Digital Delivery" },
    { id: 3, label: "Quantity Surveying & Cost Planning" },
  ],
  adminTags: [
    { id: 1, label: "Planning Engineer", variant: "red" },
    { id: 2, label: "Power BI", variant: "blue" },
    { id: 3, label: "BIM", variant: "green" },
    { id: 4, label: "Quantity Surveying", variant: "orange" },
  ],
  skills: [
    { id: 1, name: "AutoCAD", pct: 90 },
    { id: 2, name: "Revit / BIM", pct: 78 },
    { id: 3, name: "Power BI", pct: 65 },
    { id: 4, name: "MS Project", pct: 72 },
    { id: 5, name: "Quantity Surveying", pct: 55 },
  ],
  courses: {
    completed: [
      { id: 1, icon: "🏗️", name: "AutoCAD for Civil Engineers", sub: "Drafting & Design · 32 hrs", iconVariant: "red", grade: "A+", completedOn: "Mar 2025" },
      { id: 2, icon: "📊", name: "Introduction to Power BI", sub: "Data Analytics · 18 hrs", iconVariant: "green", grade: "A", completedOn: "Jan 2025" },
      { id: 3, icon: "🧮", name: "Quantity Surveying Fundamentals", sub: "Cost Engineering · 24 hrs", iconVariant: "gray", grade: "B+", completedOn: "Nov 2024" },
    ],
    ongoing: [
      { id: 4, icon: "🏢", name: "Revit Architecture & BIM", sub: "BIM Tools · 40 hrs total", pct: 68, iconVariant: "red", nextLesson: "Parametric Families" },
      { id: 5, icon: "📅", name: "MS Project Planning", sub: "Project Management · 22 hrs total", pct: 40, iconVariant: "gray", nextLesson: "Critical Path Method" },
    ],
    applied: [
      { id: 6, icon: "🌐", name: "GIS for Infrastructure Projects", sub: "Geospatial · Applied May 2025", iconVariant: "red", status: "Under Review" },
      { id: 7, icon: "🔩", name: "Structural Analysis with ETABS", sub: "Structural · Applied Apr 2025", iconVariant: "gray", status: "Waitlisted" },
    ],
  },
  certificates: [
    { id: 1, name: "AutoCAD Professional Certificate", org: "Autodesk Learning Network", date: "March 2025", credentialId: "AUT-2025-7821" },
    { id: 2, name: "Power BI Data Analyst Associate", org: "Microsoft Learn", date: "January 2025", credentialId: "MS-PBI-3940" },
    { id: 3, name: "RICS QS Foundation Certificate", org: "RICS · Royal Institution", date: "November 2024", credentialId: "RICS-2024-1102" },
    { id: 4, name: "Project Management Essentials", org: "PMI Learning Platform", date: "September 2024", credentialId: "PMI-2024-5567" },
  ],
  stats: [
    { val: "6", lbl: "Courses Done" },
    { val: "4", lbl: "Certs Earned" },
    { val: "3", lbl: "Applied Jobs" },
    { val: "82%", lbl: "Profile Done" },
  ],
};

// ─── Hover Hook ───────────────────────────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }];
}

// ─── Modal Wrapper ────────────────────────────────────────────────────────────
function Modal({ title, children, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999, padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.white, borderRadius: 18, padding: 28,
          minWidth: 340, maxWidth: 500, width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          maxHeight: "85vh", overflowY: "auto",
          animation: "slideUp 0.25s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: C.grayDark }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: C.grayLight, border: "none", borderRadius: "50%",
              width: 32, height: 32, cursor: "pointer", fontSize: 16,
              color: C.gray, display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28,
      background: C.grayDark, color: C.white, borderRadius: 10,
      padding: "12px 20px", fontSize: 13, fontWeight: 600,
      boxShadow: "0 6px 24px rgba(0,0,0,0.2)", zIndex: 10000,
      display: "flex", alignItems: "center", gap: 12,
      animation: "slideUp 0.3s ease",
    }}>
      <span style={{ color: "#4ade80" }}>✓</span>
      {message}
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 14 }}>✕</button>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function LocationIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={C.red} strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>; }
function EmailIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={C.red} strokeWidth="2"><path d="M22 10.5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h8"/><path d="M22 10.5l-10 6-10-6"/></svg>; }
function PhoneIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={C.red} strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18a2 2 0 012-1.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>; }
function CollegeIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={C.red} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>; }
function DegreeIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={C.red} strokeWidth="2"><path d="M22 10h-6m-2-8H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2v-6"/><path d="M14 2l8 8"/></svg>; }
function EditIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>; }
function ResumeIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>; }
function ShareIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>; }
function LinkedinIcon() { return <svg width="13" height="13" fill={C.red} viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>; }
function CertIcon() { return <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={C.red} strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>; }
function ChevronRight() { return <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>; }

// ─── Tag ──────────────────────────────────────────────────────────────────────
const TAG_STYLES = {
  red:    { bg: C.redLight,     color: C.red,    border: C.redMid },
  blue:   { bg: C.blueLight,   color: C.blue,   border: "#b3c6f7" },
  green:  { bg: C.greenLight,  color: C.green,  border: "#a7dfbf" },
  orange: { bg: C.orangeLight, color: C.orange, border: "#f6c98a" },
};

function Tag({ label, variant = "red", onClick }) {
  const [h, handlers] = useHover();
  const ts = TAG_STYLES[variant] || TAG_STYLES.red;
  return (
    <span
      {...handlers}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
        background: ts.bg, color: ts.color, border: `1px solid ${ts.border}`,
        cursor: onClick ? "pointer" : "default",
        transform: h && onClick ? "scale(1.06)" : "scale(1)",
        transition: "transform 0.15s, box-shadow 0.15s",
        boxShadow: h && onClick ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
      }}
    >{label}</span>
  );
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ name, pct, onClick }) {
  const [h, handlers] = useHover();
  return (
    <div
      {...handlers}
      onClick={onClick}
      style={{
        marginBottom: 12, cursor: "pointer", borderRadius: 8,
        padding: "5px 7px", background: h ? C.redLight : "transparent",
        transition: "background 0.2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 500, color: C.grayDark, marginBottom: 5 }}>
        <span>{name}</span>
        <span style={{ color: C.red, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: C.grayMid, borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${C.red}, #ff5c5f)`, borderRadius: 999 }}/>
      </div>
    </div>
  );
}

// ─── Ring ─────────────────────────────────────────────────────────────────────
function Ring({ pct, size = 72, stroke = 7 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.grayMid} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.red} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"/>
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Serif Display',serif", fontSize: 15, color: C.red,
      }}>{pct}%</div>
    </div>
  );
}

// ─── Course Item ──────────────────────────────────────────────────────────────
const ICON_BG = {
  red:   `linear-gradient(135deg, ${C.red}, #ff5c5f)`,
  gray:  `linear-gradient(135deg, #4E4E4E, #888)`,
  green: `linear-gradient(135deg, #15803d, #4ade80)`,
};

function CourseItem({ course, type, onClick }) {
  const [h, handlers] = useHover();
  return (
    <div
      {...handlers}
      onClick={() => onClick(course, type)}
      style={{
        display: "flex", alignItems: "center", gap: 14, padding: "13px 14px",
        borderRadius: 12, background: h ? C.redLight : C.grayLight,
        cursor: "pointer", transition: "background 0.2s, transform 0.15s",
        transform: h ? "translateX(4px)" : "none",
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
        background: ICON_BG[course.iconVariant || "red"],
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
      }}>{course.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.grayDark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{course.name}</div>
        <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{course.sub}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        {type === "ongoing" ? (
          <>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.red }}>{course.pct}%</span>
            <div style={{ width: 64, height: 4, background: C.grayMid, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${course.pct}%`, height: "100%", background: C.red, borderRadius: 999 }}/>
            </div>
          </>
        ) : type === "completed" ? (
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: C.greenLight, color: C.green }}>✓ Done</span>
        ) : (
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: C.orangeLight, color: C.orange }}>Pending</span>
        )}
        <ChevronRight />
      </div>
    </div>
  );
}

// ─── Certificate Card ─────────────────────────────────────────────────────────
function CertCard({ cert, onClick }) {
  const [h, handlers] = useHover();
  return (
    <div
      {...handlers}
      onClick={() => onClick(cert)}
      style={{
        background: C.grayLight, borderRadius: 12, padding: "14px 16px",
        borderLeft: `3px solid ${C.red}`, cursor: "pointer",
        transform: h ? "translateY(-3px)" : "none",
        boxShadow: h ? `0 6px 20px rgba(189,0,4,0.13)` : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ marginTop: 1, flexShrink: 0 }}><CertIcon /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.grayDark, marginBottom: 3, lineHeight: 1.35 }}>{cert.name}</div>
          <div style={{ fontSize: 11, color: C.gray }}>{cert.org}</div>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 600, marginTop: 5 }}>🎓 {cert.date}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Badge ───────────────────────────────────────────────────────────────
function StatBadge({ val, lbl, onClick }) {
  const [h, handlers] = useHover();
  return (
    <div
      {...handlers}
      onClick={onClick}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        background: h ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)",
        borderRadius: 10, padding: "10px 16px", minWidth: 70,
        cursor: "pointer", transition: "background 0.2s, transform 0.15s",
        transform: h ? "scale(1.07)" : "scale(1)",
      }}
    >
      <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: C.white }}>{val}</span>
      <span style={{ fontSize: 10, color: "#bbb", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", textAlign: "center" }}>{lbl}</span>
    </div>
  );
}

// ─── Buttons ──────────────────────────────────────────────────────────────────
function PrimaryBtn({ children, onClick, style: sx = {} }) {
  const [h, handlers] = useHover();
  return (
    <button
      {...handlers}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        background: h ? C.redHover : C.red, color: C.white, border: "none", borderRadius: 8,
        padding: "9px 20px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
        cursor: "pointer", width: "100%", transition: "background 0.2s, transform 0.15s",
        transform: h ? "translateY(-1px)" : "none", ...sx,
      }}
    >{children}</button>
  );
}

function OutlineBtn({ children, onClick, href, style: sx = {} }) {
  const [h, handlers] = useHover();
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    background: h ? C.redLight : "transparent", color: C.red,
    border: `1.5px solid ${C.red}`, borderRadius: 8,
    padding: "9px 20px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
    cursor: "pointer", width: "100%", transition: "background 0.2s, transform 0.15s",
    transform: h ? "translateY(-1px)" : "none", textDecoration: "none", ...sx,
  };
  return href
    ? <a href={href} target="_blank" rel="noreferrer" {...handlers} style={base}>{children}</a>
    : <button {...handlers} onClick={onClick} style={base}>{children}</button>;
}

// ─── Career Interest Row ──────────────────────────────────────────────────────
function CareerRow({ ci, onClick }) {
  const [h, handlers] = useHover();
  return (
    <div
      {...handlers}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
        background: h ? C.redLight : C.grayLight, borderRadius: 10, marginBottom: 10,
        cursor: "pointer", transition: "background 0.2s, transform 0.15s",
        transform: h ? "translateX(4px)" : "none",
      }}
    >
      <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.red, flexShrink: 0 }}/>
      <span style={{ fontSize: 13, fontWeight: 500, color: C.grayDark, flex: 1 }}>{ci.label}</span>
      <ChevronRight />
    </div>
  );
}

// ─── Modals ───────────────────────────────────────────────────────────────────
function EditModal({ student, onClose, onSave }) {
  const [form, setForm] = useState({
    name: student.name, role: student.role, email: student.email,
    phone: student.phone, location: student.location,
    college: student.college, degree: student.degree,
  });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const inp = { padding: "8px 12px", borderRadius: 8, border: `1.5px solid ${C.grayMid}`, fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.grayDark, width: "100%", outline: "none", marginTop: 4 };
  const lbl = { fontSize: 12, fontWeight: 600, color: C.gray, display: "block" };
  const F = (label, key) => (
    <div key={key} style={{ marginBottom: 14 }}>
      <label style={lbl}>{label}</label>
      <input style={inp} value={form[key]} onChange={set(key)} />
    </div>
  );
  return (
    <Modal title="Edit Profile" onClose={onClose}>
      {F("Full Name", "name")}
      {F("Role / Title", "role")}
      {F("Email", "email")}
      {F("Phone", "phone")}
      {F("Location", "location")}
      {F("College / University", "college")}
      {F("Degree", "degree")}
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <PrimaryBtn onClick={() => { onSave(form); onClose(); }} style={{ flex: 1 }}>Save Changes</PrimaryBtn>
        <OutlineBtn onClick={onClose} style={{ flex: 1 }}>Cancel</OutlineBtn>
      </div>
    </Modal>
  );
}

function CourseModal({ course, type, onClose }) {
  return (
    <Modal title={course.name} onClose={onClose}>
      <div style={{ fontSize: 28, textAlign: "center", marginBottom: 10 }}>{course.icon}</div>
      <div style={{ fontSize: 13, color: C.gray, textAlign: "center", marginBottom: 18 }}>{course.sub}</div>
      {type === "ongoing" && (
        <>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.gray, marginBottom: 6 }}>Progress</div>
          <div style={{ height: 8, background: C.grayMid, borderRadius: 999, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ width: `${course.pct}%`, height: "100%", background: `linear-gradient(90deg, ${C.red}, #ff5c5f)`, borderRadius: 999 }}/>
          </div>
          <div style={{ fontSize: 13, color: C.red, fontWeight: 700, marginBottom: 16 }}>{course.pct}% complete</div>
          {course.nextLesson && (
            <div style={{ background: C.grayLight, borderRadius: 10, padding: "12px 16px", fontSize: 13, color: C.grayDark }}>
              📌 Next Lesson: <strong>{course.nextLesson}</strong>
            </div>
          )}
        </>
      )}
      {type === "completed" && (
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: C.greenLight, borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.green }}>{course.grade}</div>
            <div style={{ fontSize: 11, color: C.green, marginTop: 2 }}>Grade</div>
          </div>
          <div style={{ flex: 1, background: C.redLight, borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.red }}>{course.completedOn}</div>
            <div style={{ fontSize: 11, color: C.red, marginTop: 2 }}>Completed</div>
          </div>
        </div>
      )}
      {type === "applied" && (
        <div style={{ background: C.orangeLight, borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.orange }}>{course.status}</div>
          <div style={{ fontSize: 11, color: C.orange, marginTop: 3 }}>Application Status</div>
        </div>
      )}
      <PrimaryBtn onClick={onClose} style={{ marginTop: 20 }}>Close</PrimaryBtn>
    </Modal>
  );
}

function CertModal({ cert, onClose }) {
  return (
    <Modal title="Certificate Details" onClose={onClose}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>🎓</div>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 17, color: C.grayDark, marginBottom: 4 }}>{cert.name}</div>
        <div style={{ fontSize: 13, color: C.gray }}>{cert.org}</div>
      </div>
      <div style={{ background: C.grayLight, borderRadius: 10, padding: 16, marginBottom: 18 }}>
        {[["Issued Date", cert.date, C.grayDark], ["Credential ID", cert.credentialId, C.red]].map(([k, v, col]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, lastChild: { marginBottom: 0 } }}>
            <span style={{ fontSize: 12, color: C.gray }}>{k}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: col }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <PrimaryBtn onClick={onClose} style={{ flex: 1 }}>View Certificate</PrimaryBtn>
        <OutlineBtn onClick={onClose} style={{ flex: 1 }}>Share</OutlineBtn>
      </div>
    </Modal>
  );
}

function SkillModal({ skill, onClose }) {
  const level = skill.pct >= 80 ? { lbl: "Advanced", color: C.green, bg: C.greenLight, note: "You demonstrate strong mastery of this skill." }
    : skill.pct >= 60 ? { lbl: "Intermediate", color: C.orange, bg: C.orangeLight, note: "You are progressing well in this skill." }
    : { lbl: "Beginner", color: C.blue, bg: C.blueLight, note: "Keep practising to grow your expertise." };
  return (
    <Modal title={skill.name} onClose={onClose}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <Ring pct={skill.pct} size={96} stroke={8} />
        <div style={{ fontSize: 14, color: C.gray, marginTop: 8 }}>Proficiency</div>
      </div>
      <div style={{ background: level.bg, borderRadius: 10, padding: "12px 16px", fontSize: 13, color: level.color, fontWeight: 600, textAlign: "center", marginBottom: 14 }}>
        {level.lbl} — {level.note}
      </div>
      <PrimaryBtn onClick={onClose}>Close</PrimaryBtn>
    </Modal>
  );
}

function CareerModal({ interest, onClose }) {
  return (
    <Modal title="Career Interest" onClose={onClose}>
      <div style={{ textAlign: "center", padding: "10px 0 18px" }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>🎯</div>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18, color: C.grayDark }}>{interest.label}</div>
      </div>
      <div style={{ background: C.redLight, borderRadius: 10, padding: "12px 16px", fontSize: 13, color: C.gray, lineHeight: 1.65, marginBottom: 18 }}>
        Courses, certifications, and job openings aligned with this interest will be highlighted in your personalised learning feed.
      </div>
      <PrimaryBtn onClick={onClose}>Explore Courses</PrimaryBtn>
    </Modal>
  );
}

function TagModal({ tag, onClose }) {
  return (
    <Modal title="Admin Tag Details" onClose={onClose}>
      <div style={{ textAlign: "center", padding: "8px 0 18px" }}>
        <Tag label={tag.label} variant={tag.variant} />
        <div style={{ fontSize: 13, color: C.gray, marginTop: 14, lineHeight: 1.65 }}>
          This tag was applied by an admin to highlight your expertise in <strong>{tag.label}</strong>. It is visible to recruiters and companies reviewing your profile.
        </div>
      </div>
      <PrimaryBtn onClick={onClose}>Got It</PrimaryBtn>
    </Modal>
  );
}

function HiringModal({ onClose }) {
  const rows = [
    { label: "Course Completion", score: 88, note: "6 courses done, 2 in progress" },
    { label: "Certifications", score: 80, note: "4 valid certificates earned" },
    { label: "Profile Completeness", score: 82, note: "Add portfolio to boost score" },
    { label: "Skills Coverage", score: 75, note: "5 skills mapped to job roles" },
    { label: "Job Applications", score: 70, note: "3 positions applied" },
  ];
  return (
    <Modal title="Hiring Readiness Breakdown" onClose={onClose}>
      {rows.map(r => (
        <div key={r.label} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: C.grayDark, marginBottom: 5 }}>
            <span>{r.label}</span><span style={{ color: C.red }}>{r.score}%</span>
          </div>
          <div style={{ height: 6, background: C.grayMid, borderRadius: 999, overflow: "hidden", marginBottom: 4 }}>
            <div style={{ width: `${r.score}%`, height: "100%", background: `linear-gradient(90deg, ${C.red}, #ff5c5f)`, borderRadius: 999 }}/>
          </div>
          <div style={{ fontSize: 11, color: C.gray }}>{r.note}</div>
        </div>
      ))}
      <PrimaryBtn onClick={onClose} style={{ marginTop: 4 }}>Close</PrimaryBtn>
    </Modal>
  );
}

function ShareModal({ onClose, showToast }) {
  const url = "https://platform.com/profile/Bharath-kumar";
  return (
    <Modal title="Share Profile" onClose={onClose}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.gray, marginBottom: 6 }}>Profile Link</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input readOnly value={url} style={{
            flex: 1, padding: "8px 12px", borderRadius: 8, border: `1.5px solid ${C.grayMid}`,
            fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.gray,
            background: C.grayLight, outline: "none",
          }}/>
          <PrimaryBtn onClick={() => { navigator.clipboard?.writeText(url); showToast("Link copied!"); onClose(); }} style={{ width: "auto", padding: "8px 16px", flexShrink: 0 }}>Copy</PrimaryBtn>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {["LinkedIn", "Email", "WhatsApp", "Download PDF"].map(opt => (
          <OutlineBtn key={opt} onClick={() => { showToast(`Shared via ${opt}`); onClose(); }}>{opt}</OutlineBtn>
        ))}
      </div>
    </Modal>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function StudentProfilePage({ initialStudent = DEFAULT_STUDENT, isAdminView = true }) {
  const [student, setStudent] = useState(initialStudent);
  const [activeTab, setActiveTab] = useState("completed");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const open = (type, payload = null) => setModal({ type, payload });
  const close = () => setModal(null);
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const save = updates => { setStudent(s => ({ ...s, ...updates })); showToast("Profile updated!"); };

  const tabs = [
    { key: "completed", label: `Completed (${student.courses.completed.length})` },
    { key: "ongoing",   label: `Ongoing (${student.courses.ongoing.length})` },
    { key: "applied",   label: `Applied (${student.courses.applied.length})` },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f4f4f4", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Modals */}
      {modal?.type === "edit"    && <EditModal student={student} onClose={close} onSave={save} />}
      {modal?.type === "course"  && <CourseModal course={modal.payload.course} type={modal.payload.type} onClose={close} />}
      {modal?.type === "cert"    && <CertModal cert={modal.payload} onClose={close} />}
      {modal?.type === "skill"   && <SkillModal skill={modal.payload} onClose={close} />}
      {modal?.type === "career"  && <CareerModal interest={modal.payload} onClose={close} />}
      {modal?.type === "tag"     && <TagModal tag={modal.payload} onClose={close} />}
      {modal?.type === "hiring"  && <HiringModal onClose={close} />}
      {modal?.type === "share"   && <ShareModal onClose={close} showToast={showToast} />}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Red accent bar */}
      <div style={{ background: C.red, height: 4 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "30px 20px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 22, alignItems: "start" }}>

          {/* ══ SIDEBAR ══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Identity */}
            <div style={{ background: C.white, borderRadius: 18, boxShadow: "0 2px 14px rgba(0,0,0,0.07)", overflow: "hidden" }}>
              <div style={{ background: `linear-gradient(135deg, ${C.red} 0%, #7a0002 100%)`, height: 66 }} />
              <div style={{ padding: "0 22px 22px", textAlign: "center" }}>
                <div style={{ position: "relative", display: "inline-block", marginTop: -36, marginBottom: 12 }}>
                  <div
                    onClick={() => open("share")}
                    style={{
                      width: 82, height: 82, borderRadius: "50%", border: `4px solid ${C.white}`,
                      background: `linear-gradient(135deg, ${C.redMid}, ${C.red})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'DM Serif Display',serif", fontSize: 28, color: C.white,
                      boxShadow: `0 4px 16px rgba(189,0,4,0.3)`, cursor: "pointer",
                    }}
                  >{student.initials}</div>
                  <div style={{ position: "absolute", bottom: 4, right: 4, width: 14, height: 14, background: "#22c55e", borderRadius: "50%", border: "2px solid white" }} />
                </div>

                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: C.grayDark, marginBottom: 3 }}>{student.name}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.1px", textTransform: "uppercase", color: C.red, marginBottom: 13 }}>{student.role}</div>

                {[
                  [LocationIcon, student.location],
                  [EmailIcon, student.email],
                  [PhoneIcon, student.phone],
                  [CollegeIcon, student.college],
                  [DegreeIcon, `${student.degree} · ${student.year}`],
                ].map(([Ic, txt], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: C.gray, marginBottom: 5 }}>
                    <Ic />{txt}
                  </div>
                ))}

                <div
                  onClick={() => window.open("https://linkedin.com", "_blank")}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: 12, color: C.red, margin: "6px 0", cursor: "pointer", fontWeight: 600 }}
                >
                  <LinkedinIcon /> {student.linkedin}
                </div>

                <div style={{ height: 1, background: C.grayMid, margin: "13px 0" }} />
                <PrimaryBtn onClick={() => open("edit")} style={{ marginBottom: 8 }}><EditIcon /> Edit Profile</PrimaryBtn>
                <OutlineBtn href={student.resumeUrl} style={{ marginBottom: 8 }}><ResumeIcon /> Download Resume</OutlineBtn>
                <OutlineBtn onClick={() => open("share")}><ShareIcon /> Share Profile</OutlineBtn>
              </div>
            </div>

            {/* Admin Tags */}
            {isAdminView && (
              <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <SectionTitle>Admin Tags</SectionTitle>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {student.adminTags.map(t => <Tag key={t.id} {...t} onClick={() => open("tag", t)} />)}
                </div>
              </div>
            )}

            {/* Skills */}
            <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <SectionTitle hint="click to explore">Skills</SectionTitle>
              {student.skills.map(sk => <SkillBar key={sk.id} {...sk} onClick={() => open("skill", sk)} />)}
            </div>

            {/* Profile Completion */}
            <div
              onClick={() => open("edit")}
              style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer" }}
            >
              <SectionTitle>Profile Completion</SectionTitle>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Ring pct={student.profileCompletion} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.grayDark }}>Almost There!</div>
                  <div style={{ fontSize: 12, color: C.gray, marginTop: 3, lineHeight: 1.5 }}>Add portfolio links to reach 100%</div>
                  <div style={{ fontSize: 11, color: C.red, fontWeight: 600, marginTop: 6 }}>+ Complete Now →</div>
                </div>
              </div>
            </div>

          </div>{/* /sidebar */}

          {/* ══ MAIN ══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Hiring Readiness */}
            <HiringCard student={student} onOpen={() => open("hiring")} />

            {/* Career Interests */}
            <div style={{ background: C.white, borderRadius: 16, padding: 22, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <SectionTitle hint="click to explore">Career Interests</SectionTitle>
              {student.careerInterests.map(ci => <CareerRow key={ci.id} ci={ci} onClick={() => open("career", ci)} />)}
            </div>

            {/* Courses */}
            <div style={{ background: C.white, borderRadius: 16, padding: 22, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <SectionTitle>Courses</SectionTitle>
              <div style={{ display: "flex", borderBottom: `2px solid ${C.grayMid}`, marginBottom: 16 }}>
                {tabs.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    style={{
                      padding: "9px 18px", fontSize: 13, fontWeight: 600, border: "none", background: "none",
                      cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                      color: activeTab === t.key ? C.red : C.gray,
                      borderBottom: activeTab === t.key ? `2.5px solid ${C.red}` : "2.5px solid transparent",
                      marginBottom: -2, transition: "color 0.2s",
                    }}
                  >{t.label}</button>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {student.courses[activeTab].map(c => (
                  <CourseItem key={c.id} course={c} type={activeTab} onClick={(course, type) => open("course", { course, type })} />
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div style={{ background: C.white, borderRadius: 16, padding: 22, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <SectionTitle hint="click to view">Certificates Earned</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {student.certificates.map(cert => <CertCard key={cert.id} cert={cert} onClick={c => open("cert", c)} />)}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionTitle({ children, hint }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.3px", textTransform: "uppercase", color: C.gray, marginBottom: 14 }}>
      {children}
      {hint && <span style={{ fontSize: 10, color: C.red, fontWeight: 400, fontStyle: "italic", marginLeft: 6 }}>({hint})</span>}
    </div>
  );
}

function HiringCard({ student, onOpen }) {
  const [h, handlers] = useHover();
  return (
    <div
      {...handlers}
      onClick={onOpen}
      style={{
        background: `linear-gradient(135deg, ${C.grayDark} 0%, #3a3a3a 100%)`,
        borderRadius: 18, padding: "22px 26px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, flexWrap: "wrap", cursor: "pointer",
        boxShadow: h ? "0 10px 36px rgba(0,0,0,0.28)" : "0 4px 20px rgba(0,0,0,0.18)",
        transform: h ? "translateY(-2px)" : "none",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.3px", textTransform: "uppercase", color: "#999", marginBottom: 5 }}>
          Hiring Readiness Score · <span style={{ color: C.redMid }}>Click for Details</span>
        </div>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 48, color: C.white, lineHeight: 1 }}>
          {student.hiringScore}<span style={{ fontSize: 20, color: "#888" }}>/100</span>
        </div>
        <div style={{ fontSize: 13, color: "#ccc", marginTop: 4 }}>{student.hiringLabel}</div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {student.stats.map((st, i) => <StatBadge key={i} {...st} onClick={e => { e.stopPropagation(); onOpen(); }} />)}
      </div>
    </div>
  );
}