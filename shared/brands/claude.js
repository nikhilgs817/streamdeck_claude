// Claude Controls — "Claude Dark" key artwork.
// Original line icons in a warm charcoal / ivory / clay palette inspired by the Claude desktop app.
// No logos are reproduced. Every icon has its own seamless 6-second animation (phase 0..1).
// No SVG filters (Stream Deck's renderer ignores them); labels never move.

export const CLAUDE_TOKENS = {
	bgTop: "#2C2B28", bgBottom: "#1A1917", edge: "#3D3B36",
	ink: "#F3EFE6", muted: "#8F8A80", faint: "#4A4741",
	clay: "#D97757", clayLight: "#EDA788", surface: "#2A2926", cut: "#1A1917",
	serif: "Georgia, 'Times New Roman', 'DejaVu Serif', serif",
};

// Mutable palette used while one key renders (renders are synchronous, so this is safe).
const T = { ...CLAUDE_TOKENS };
const TAU = Math.PI * 2;
const f = (n) => (Math.round(n * 100) / 100).toString();
const wave = (p) => (1 - Math.cos(p * TAU)) / 2; // 0 → 1 → 0
const sline = (c = T.ink, w = 5.5) => `stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const line = (c = T.ink, w = 5.5) => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);

function sparkle(cx, cy, r, color, opacity) {
	const k = r * 0.28;
	return `<path d="M${f(cx)} ${f(cy - r)}Q${f(cx + k)} ${f(cy - k)} ${f(cx + r)} ${f(cy)}Q${f(cx + k)} ${f(cy + k)} ${f(cx)} ${f(cy + r)}Q${f(cx - k)} ${f(cy + k)} ${f(cx - r)} ${f(cy)}Q${f(cx - k)} ${f(cy - k)} ${f(cx)} ${f(cy - r)}Z" fill="${color}" opacity="${f(opacity)}"/>`;
}

function magnifier(cx, cy, r, inner = "") {
	return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${T.ink}" fill-opacity=".06" ${sline()}/>` + inner +
		`<path d="M${f(cx + r * 0.72)} ${f(cy + r * 0.72)}L${f(cx + r * 1.45)} ${f(cy + r * 1.45)}" ${line(T.ink, 7)}/>`;
}

function gear(cx, cy, rot) {
	let teeth = "";
	for (let i = 0; i < 8; i++) teeth += `<rect x="${f(cx - 5.5)}" y="${f(cy - 33)}" width="11" height="12" rx="3" fill="${T.ink}" transform="rotate(${i * 45} ${cx} ${cy})"/>`;
	return `<g transform="rotate(${f(rot)} ${cx} ${cy})">${teeth}<circle cx="${cx}" cy="${cy}" r="24" ${line()}/></g>`;
}

/** Icon artwork per glyph, drawn around (72, 56). */
export const CLAUDE_ART = {
	back: (p) => {
		const dx = -7 * wave(p);
		return `<g transform="translate(${f(dx)} 0)"><path d="M100 56H48M68 36L48 56l20 20" ${line(T.ink, 6.5)}/></g>` +
			[0, 1, 2].map((i) => `<circle cx="${f(108 - i * 9 + dx * 0.4)}" cy="56" r="3" fill="${T.clay}" opacity="${f(Math.max(0, wave(p) - i * 0.25))}"/>`).join("");
	},
	newchat: (p) => {
		const s = 1 + 0.14 * wave(p), r = 90 * p;
		return `<path d="M40 26h64a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H70L52 94V80H40a10 10 0 0 1-10-10V36a10 10 0 0 1 10-10z" fill="${T.ink}" fill-opacity=".06" ${sline()}/>` +
			`<g transform="translate(72 53) scale(${f(s)})"><path d="M0 -13V13M-13 0H13" ${line(T.clay, 6.5)}/></g>` +
			sparkle(112, 22, 7, T.clayLight, wave((p + 0.3) % 1)) + sparkle(122, 38, 4, T.clay, wave((p + 0.65) % 1));
	},
	usage: (p) => {
		const v = 0.22 + 0.6 * wave(p), R = 36, L = Math.PI * R, a = Math.PI * (1 - v);
		const nx = 72 + (R - 9) * Math.cos(a), ny = 76 - (R - 9) * Math.sin(a);
		let ticks = "";
		for (let i = 0; i <= 4; i++) { const t = Math.PI * (1 - i / 4); ticks += `<path d="M${f(72 + 44 * Math.cos(t))} ${f(76 - 44 * Math.sin(t))}L${f(72 + 49 * Math.cos(t))} ${f(76 - 49 * Math.sin(t))}" ${line(T.muted, 3)}/>`; }
		return ticks + `<path d="M36 76A36 36 0 0 1 108 76" ${line(T.faint, 9)}/>` +
			`<path d="M36 76A36 36 0 0 1 108 76" fill="none" stroke="${T.clay}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${f(L * v)} ${f(L)}"/>` +
			`<path d="M72 76L${f(nx)} ${f(ny)}" ${line(T.ink, 5)}/><circle cx="72" cy="76" r="6" fill="${T.ink}"/>` +
			`<path d="M50 92h44" ${line(T.muted, 3)}/>`;
	},
	search: (p) => {
		const x = 58 + 18 * Math.sin(p * TAU);
		return `<path d="M30 32h52M30 48h70M30 64h40M30 80h58" ${line(T.faint, 5)}/>` +
			`<rect x="${f(x - 16)}" y="${f(44)}" width="32" height="8" rx="4" fill="${T.clay}" opacity=".85"/>` +
			magnifier(x, 48, 17) ;
	},
	find: (p) => {
		const sweep = (p * 1.25) % 1, x = 32 + sweep * 64, o = Math.sin(Math.min(1, sweep) * Math.PI);
		return `<rect x="26" y="22" width="92" height="68" rx="10" fill="${T.ink}" fill-opacity=".05" ${sline(T.ink, 4.5)}/>` +
			`<rect x="${f(x - 4)}" y="45" width="26" height="12" rx="3" fill="${T.clay}" opacity="${f(0.25 + 0.75 * o)}"/>` +
			`<path d="M38 38h56M38 51h68M38 64h44M38 77h60" ${line(T.muted, 4)}/>`;
	},
	sidebar: (p) => {
		const w = 20 + 12 * wave(p);
		return `<rect x="26" y="24" width="92" height="66" rx="10" fill="${T.ink}" fill-opacity=".05" ${sline()}/>` +
			`<path d="M36 24h${f(w)}v66H36a10 10 0 0 1-10-10V34a10 10 0 0 1 10-10z" fill="${T.clay}" opacity=".9"/>` +
			`<path d="M${f(30 + w)} 38h${f(76 - w)}M${f(30 + w)} 52h${f(56 - w)}M${f(30 + w)} 66h${f(66 - w)}" ${line(T.muted, 4)}/>`;
	},
	settings: (p) => gear(72, 56, p * 45) + `<circle cx="72" cy="56" r="8" fill="${T.clay}"/>`,
	shortcuts: (p) => {
		const lit = Math.floor(p * 9) % 9; let keys = "";
		for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) {
			const i = r * 5 + c, on = i === lit;
			keys += `<rect x="${32 + c * 17}" y="${38 + r * 16}" width="12" height="10" rx="2.5" fill="${on ? T.clay : T.muted}" opacity="${on ? 1 : 0.7}"/>`;
		}
		return `<rect x="22" y="26" width="100" height="62" rx="10" fill="${T.ink}" fill-opacity=".05" ${sline(T.ink, 4.5)}/>` + keys +
			`<rect x="46" y="72" width="52" height="8" rx="3" fill="${lit === 9 ? T.clay : T.muted}" opacity=".7"/>`;
	},
	zoomin: (p) => {
		const s = 1 + 0.1 * wave(p);
		return `<g transform="translate(64 50) scale(${f(s)}) translate(-64 -50)">${magnifier(64, 50, 25, `<path d="M64 39v22M53 50h22" ${line(T.clay, 6)}/>`)}</g>`;
	},
	zoomout: (p) => {
		const s = 1 - 0.1 * wave(p);
		return `<g transform="translate(64 50) scale(${f(s)}) translate(-64 -50)">${magnifier(64, 50, 25, `<path d="M53 50h22" ${line(T.clay, 6)}/>`)}</g>`;
	},
	resetzoom: (p) => {
		const d = 6 * wave(p);
		const c = (x, y, sx, sy) => `<path d="M${f(x)} ${f(y + 14 * sy)}V${f(y)}H${f(x + 14 * sx)}" ${line(T.ink, 5.5)}/>`;
		return c(30 + d, 22 + d, 1, 1) + c(114 - d, 22 + d, -1, 1) + c(30 + d, 90 - d, 1, -1) + c(114 - d, 90 - d, -1, -1) +
			`<text x="72" y="65" text-anchor="middle" font-family="${T.serif}" font-size="24" font-weight="700" fill="${T.clay}">1:1</text>`;
	},
	copy: (p) => {
		const d = 7 * wave(p);
		return `<rect x="30" y="20" width="54" height="64" rx="8" fill="none" stroke="${T.muted}" stroke-width="4.5"/>` +
			`<g transform="translate(${f(d)} ${f(d * 0.6)})"><rect x="52" y="34" width="56" height="64" rx="8" fill="${T.surface}" ${sline()}/>` +
			`<path d="M63 52h34M63 64h34M63 76h22" ${line(T.clay, 4.5)}/></g>`;
	},
	paste: (p) => {
		const drop = -14 * (1 - wave(p)), o = 0.35 + 0.65 * wave(p);
		return `<rect x="34" y="26" width="76" height="72" rx="10" fill="${T.ink}" fill-opacity=".05" ${sline()}/>` +
			`<rect x="54" y="18" width="36" height="16" rx="5" fill="${T.clay}"/>` +
			`<g transform="translate(0 ${f(drop)})" opacity="${f(o)}"><path d="M48 54h48M48 68h48M48 82h30" ${line(T.muted, 4.5)}/></g>`;
	},
	undo: (p) => {
		const r = -22 * wave(p);
		return `<g transform="rotate(${f(r)} 76 60)"><path d="M48 46h38a20 20 0 0 1 0 40H58" ${line(T.ink, 6)}/><path d="M60 32L46 46l14 14" ${line(T.ink, 6)}/></g>` +
			`<circle cx="${f(58)}" cy="86" r="4" fill="${T.clay}" transform="rotate(${f(r)} 76 60)"/>`;
	},
	redo: (p) => {
		const r = 22 * wave(p);
		return `<g transform="rotate(${f(r)} 68 60)"><path d="M96 46H58a20 20 0 0 0 0 40h28" ${line(T.ink, 6)}/><path d="M84 32l14 14-14 14" ${line(T.ink, 6)}/></g>` +
			`<circle cx="86" cy="86" r="4" fill="${T.clay}" transform="rotate(${f(r)} 68 60)"/>`;
	},
	focus: (p) => {
		const d = 5 * wave(p);
		return `<rect x="38" y="32" width="68" height="48" rx="7" fill="${T.ink}" fill-opacity=".06" ${sline(T.ink, 4.5)}/><path d="M38 44h68" ${line(T.muted, 3)}/>` +
			[[24, 20, 1, 1], [120, 20, -1, 1], [24, 92, 1, -1], [120, 92, -1, -1]].map(([x, y, sx, sy]) =>
				`<path d="M${f(x - d * sx)} ${f(y + 12 * sy - d * sy)}V${f(y - d * sy)}H${f(x + 12 * sx - d * sx)}" ${line(T.clay, 5)}/>`).join("");
	},
	shortcut: (p) => {
		const press = Math.max(0, Math.sin(p * TAU * 2)) ** 6 * 4;
		return `<rect x="36" y="${f(26 + press)}" width="72" height="62" rx="12" fill="${T.surface}" ${sline(T.ink, 5)}/>` +
			`<path d="M36 ${f(76 + press)}h72" stroke="${T.faint}" stroke-width="3"/>` +
			`<text x="72" y="${f(66 + press)}" text-anchor="middle" font-family="${T.serif}" font-size="30" font-weight="700" fill="${T.clay}">K</text>`;
	},
	projects: (p) => {
		const lift = -8 * wave(p);
		return `<rect x="46" y="${f(26 + lift)}" width="52" height="34" rx="5" fill="${T.clayLight}" opacity=".9"/>` +
			`<rect x="52" y="${f(32 + lift * 0.5)}" width="52" height="34" rx="5" fill="${T.clay}"/>` +
			`<path d="M26 46a8 8 0 0 1 8-8h20l8 8h48a8 8 0 0 1 8 8v30a8 8 0 0 1-8 8H34a8 8 0 0 1-8-8z" fill="${T.surface}" ${sline()}/>`;
	},
	recents: (p) => {
		const a = p * 360;
		return `<circle cx="72" cy="56" r="33" fill="${T.ink}" fill-opacity=".05" ${sline()}/>` +
			`<path d="M72 56V36" ${line(T.ink, 5)} transform="rotate(${f(a / 12)} 72 56)"/>` +
			`<path d="M72 56h20" ${line(T.clay, 5)} transform="rotate(${f(a)} 72 56)"/><circle cx="72" cy="56" r="4.5" fill="${T.ink}"/>`;
	},
	code: (p) => {
		const on = (p * 4) % 1 < 0.55;
		return `<path d="M54 34L30 56l24 22M90 34l24 22-24 22" ${line(T.ink, 6.5)}/>` +
			`<rect x="69" y="40" width="6" height="32" rx="2" fill="${T.clay}" opacity="${on ? 1 : 0.15}"/>`;
	},
	cowork: (p) => {
		const step = Math.floor(p * 4) % 4;
		return [0, 1, 2].map((i) => {
			const y = 32 + i * 22, done = i < step;
			return `<rect x="32" y="${y - 8}" width="16" height="16" rx="4" fill="${done ? T.clay : "none"}" stroke="${done ? T.clay : T.muted}" stroke-width="3.5"/>` +
				(done ? `<path d="M36 ${y}l3.5 3.5L45 ${y - 4}" ${line(T.cut, 3)}/>` : "") +
				`<path d="M58 ${y}h${i === 1 ? 38 : 52}" ${line(done ? T.muted : T.ink, 5)}/>`;
		}).join("");
	},
	incognito: (p) => {
		const blink = ((p * 3) % 1) > 0.92 ? 0.15 : 1;
		return `<path d="M40 92V54a32 32 0 0 1 64 0v38l-10.7-8-10.6 8-10.7-8-10.7 8-10.6-8z" fill="${T.ink}" fill-opacity=".06" ${sline()}/>` +
			`<ellipse cx="60" cy="56" rx="5" ry="${f(7 * blink)}" fill="${T.clay}"/><ellipse cx="84" cy="56" rx="5" ry="${f(7 * blink)}" fill="${T.clay}"/>`;
	},
	stop: (p) => `<rect x="40" y="24" width="64" height="64" rx="16" fill="none" stroke="${T.ink}" stroke-width="5.5"/>` +
		`<rect x="54" y="38" width="36" height="36" rx="8" fill="${T.clay}" opacity="${f(0.55 + 0.45 * wave(p))}"/>`,
};
CLAUDE_ART.fullscreen = (p) => {
	const d = 6 * wave(p);
	return `<rect x="48" y="38" width="48" height="36" rx="6" fill="${T.clay}" opacity=".85"/>` +
		[[30, 20, 1, 1], [114, 20, -1, 1], [30, 92, 1, -1], [114, 92, -1, -1]].map(([x, y, sx, sy]) =>
			`<path d="M${f(x - sx * d)} ${f(y + 16 * sy - sy * d)}V${f(y - sy * d)}H${f(x + 16 * sx - sx * d)}" ${line(T.ink, 6)}/>`).join("");
};

// ── More icons for the top-20 Claude features ──
Object.assign(CLAUDE_ART, {
	main: (p) => CLAUDE_ART.back(p),
	more: (p) => {
		const dx = 7 * wave(p);
		return [0, 1, 2].map((i) => `<circle cx="${34 + i * 16}" cy="56" r="5" fill="${i === Math.floor(p * 3) % 3 ? T.clay : T.muted}"/>`).join("") +
			`<g transform="translate(${f(dx)} 0)"><path d="M84 56h26M98 42l14 14-14 14" ${line(T.ink, 6.5)}/></g>`;
	},
	artifacts: (p) => `<rect x="26" y="24" width="92" height="66" rx="10" fill="${T.ink}" fill-opacity=".05" ${sline()}/><path d="M26 38h92" ${line(T.muted, 3)}/>` +
		`<g transform="rotate(${f(p * 90)} 56 66)"><rect x="46" y="56" width="20" height="20" rx="3" fill="${T.clay}"/></g>` +
		`<circle cx="92" cy="${f(66 - 5 * wave(p))}" r="11" fill="none" stroke="${T.ink}" stroke-width="4.5"/>`,
	copyresponse: (p) => {
		const d = 9 * wave(p);
		return `<path d="M30 24h56a8 8 0 0 1 8 8v28a8 8 0 0 1-8 8H50L36 80V68h-6a8 8 0 0 1-8-8V32a8 8 0 0 1 8-8z" fill="${T.ink}" fill-opacity=".06" ${sline(T.ink, 5)}/>` +
			`<path d="M36 40h40M36 52h28" ${line(T.muted, 4)}/>` +
			`<g transform="translate(${f(d * 0.6)} ${f(d * 0.5)})"><rect x="78" y="52" width="36" height="42" rx="6" fill="${T.surface}" ${sline(T.clay, 4.5)}/><path d="M86 66h20M86 77h14" ${line(T.clay, 4)}/></g>`;
	},
	connectors: (p) => {
		const gap = 6 + 6 * wave(p);
		return `<g transform="translate(${f(-gap / 2)} 0)"><path d="M28 56h18" ${line(T.ink, 6)}/><rect x="44" y="38" width="22" height="36" rx="6" fill="${T.surface}" ${sline(T.ink, 5)}/><path d="M66 46h10M66 66h10" ${line(T.ink, 5)}/></g>` +
			`<g transform="translate(${f(gap / 2)} 0)"><rect x="80" y="38" width="22" height="36" rx="6" fill="${T.clay}"/><path d="M102 56h16" ${line(T.clay, 6)}/></g>` +
			sparkle(78, 56, 7, T.clayLight, 1 - wave(p));
	},
	editlast: (p) => {
		const L = 64, drawn = L * (0.15 + 0.85 * ((p * 1.15) % 1));
		const x = 36 + Math.min(L, drawn);
		return `<path d="M36 88h64" ${line(T.faint, 5)}/><path d="M36 88h${f(L)}" fill="none" stroke="${T.clay}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${f(Math.min(L, drawn))} 200"/>` +
			`<g transform="translate(${f(x - 36)} 0)"><path d="M30 80l5-16 36-36 12 12-36 36z" fill="${T.surface}" ${sline(T.ink, 5)}/><path d="M64 34l12 12" ${line(T.ink, 4)}/></g>`;
	},
	focusinput: (p) => {
		const on = (p * 4) % 1 < 0.55;
		return `<rect x="20" y="40" width="104" height="34" rx="17" fill="${T.ink}" fill-opacity=".06" ${sline(T.ink, 5)}/>` +
			`<rect x="38" y="47" width="5" height="20" rx="2" fill="${T.clay}" opacity="${on ? 1 : 0.1}"/>` +
			`<circle cx="106" cy="57" r="9" fill="${T.clay}"/><path d="M106 62v-9M102 56l4-4 4 4" ${line(T.cut, 2.5)}/>`;
	},
	newwindow: (p) => {
		const d = 5 * wave(p);
		return `<rect x="22" y="38" width="62" height="48" rx="7" fill="none" stroke="${T.muted}" stroke-width="4.5"/>` +
			`<g transform="translate(${f(d)} ${f(-d)})"><rect x="46" y="24" width="68" height="50" rx="7" fill="${T.surface}" ${sline(T.ink, 5)}/><path d="M46 36h68" ${line(T.muted, 3)}/>` +
			`<path d="M80 44v20M70 54h20" ${line(T.clay, 5.5)}/></g>`;
	},
});
CLAUDE_ART.dictate = (p) => {
	const ring = (k) => { const q = (p * 2 + k) % 1; return `<circle cx="72" cy="48" r="${f(26 + q * 18)}" fill="none" stroke="${T.clay}" stroke-width="3" opacity="${f((1 - q) * 0.9)}"/>`; };
	return ring(0) + ring(0.5) +
		`<rect x="60" y="22" width="24" height="42" rx="12" fill="${T.ink}"/><path d="M50 54a22 22 0 0 0 44 0M72 76v12M60 88h24" ${line(T.ink, 5)}/>`;
};

// ── Styles ──
const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const mix = (a, b, t) => "#" + hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * t).toString(16).padStart(2, "0")).join("");
const CLAY = ["#F0A07C", "#C8582F", "#5C2414"];

/** Palettes for every look. `colours` = [start, end, ink] of the chosen colour theme (Colourful/Vivid/Pro). */
function palette(style, colours) {
	const [c1, c2, c3] = colours && colours.length >= 3 ? colours : CLAY;
	switch (style) {
		case "light": return { bgTop: "#FBF9F4", bgBottom: "#ECE7DA", edge: "#D8D0BF", ink: "#3A362E", muted: "#A0988A", faint: "#DED7C8", clay: "#C96442", clayLight: "#E38A64", surface: "#FFFFFF", cut: "#FFFFFF", glow: "#C96442", font: "serif" };
		case "vivid": return { bgTop: c1, bgBottom: c2, edge: mix(c1, "#ffffff", 0.35), ink: "#FFFFFF", muted: mix(c2, "#ffffff", 0.62), faint: mix(c2, "#ffffff", 0.3), clay: c3, clayLight: mix(c3, "#ffffff", 0.35), surface: mix(c2, "#000000", 0.12), cut: c2, glow: "#ffffff", font: "sans" };
		case "neon": return { bgTop: "#2A2E40", bgBottom: "#0B0D14", edge: mix(c1, "#0B0D14", 0.55), ink: c1, muted: mix(c1, "#0B0D14", 0.45), faint: mix(c1, "#0B0D14", 0.75), clay: mix(c2, "#ffffff", 0.2), clayLight: mix(c1, "#ffffff", 0.55), surface: "#1A1C26", cut: "#0B0D14", glow: c1, font: "sans" };
		case "pro": return { bgTop: "#2B3040", bgBottom: "#0E1016", edge: "#2E3445", ink: "#E8EDF6", muted: "#7F8899", faint: "#3A4152", clay: c1, clayLight: mix(c1, "#ffffff", 0.4), surface: "#1C2130", cut: "#0E1016", glow: c1, bar: [c1, c2], font: "sans" };
		default: return { ...CLAUDE_TOKENS, glow: CLAUDE_TOKENS.clay, font: "serif" };
	}
}

let uid = 0;
/**
 * Full 144×144 key. `phase` 0..1 drives the icon animation; labels stay still.
 * style: "app" (Claude Dark, default) · "light" (Claude Light) · "neon" (Colourful) · "vivid" · "pro".
 */
export function claudeKeySvg({ glyph, label = "", phase = 0, setup = false, animate = true, style = "app", colours }) {
	const p = animate ? ((phase % 1) + 1) % 1 : 0;
	const pal = palette(style, colours);
	Object.assign(T, pal);
	const u = "cl" + (++uid).toString(36);
	const draw = CLAUDE_ART[glyph] || CLAUDE_ART.newchat;
	const serif = pal.font === "serif";
	const raw = String(label).slice(0, 14);
	const text = esc(serif ? raw : raw.toUpperCase());
	const fs = serif ? (text.length > 11 ? 13 : text.length > 8 ? 15 : 17) : Math.min(15, Math.floor(118 / Math.max(1, raw.length * 0.66)));
	const glowOp = (style === "vivid" ? 0.16 : style === "neon" ? 0.22 : 0.10) + 0.06 * wave(p);
	let body = `<defs><linearGradient id="${u}b" x1="0" y1="0" x2="${style === "vivid" ? 1 : 0}" y2="1"><stop offset="0" stop-color="${pal.bgTop}"/><stop offset="1" stop-color="${pal.bgBottom}"/></linearGradient>` +
		`<radialGradient id="${u}g" cx=".5" cy=".38" r=".55"><stop offset="0" stop-color="${pal.glow}" stop-opacity="${f(glowOp)}"/><stop offset="1" stop-color="${pal.glow}" stop-opacity="0"/></radialGradient>` +
		(pal.bar ? `<linearGradient id="${u}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${pal.bar[0]}"/><stop offset="1" stop-color="${pal.bar[1]}"/></linearGradient>` : "") + `</defs>` +
		`<rect width="144" height="144" fill="url(#${u}b)"/><rect width="144" height="144" fill="url(#${u}g)"/>`;
	if (style === "vivid") body += `<circle cx="128" cy="12" r="50" fill="#fff" opacity=".10"/><circle cx="10" cy="140" r="44" fill="#000" opacity=".10"/>`;
	body += `<rect x="1.5" y="1.5" width="141" height="141" rx="14" fill="none" stroke="${pal.edge}" stroke-width="2"/>`;
	if (pal.bar) body += `<rect width="144" height="6" fill="url(#${u}r)"/>`;
	// Travelling sheen on the frame for the colour looks.
	if (animate && (style === "neon" || style === "vivid" || style === "pro")) body += `<rect x="2.5" y="2.5" width="139" height="139" rx="13" fill="none" stroke="#fff" stroke-width="1.6" stroke-opacity=".28" stroke-dasharray="30 526" stroke-dashoffset="${f(-p * 556)}"/>`;
	body += `<g data-claude-glyph="${esc(glyph)}">${draw(p)}</g>`;
	if (setup) body += `<rect x="46" y="92" width="52" height="15" rx="7.5" fill="${pal.clay}"/><text x="72" y="103" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.5" font-weight="700" letter-spacing="1" fill="${pal.cut}">SETUP</text>`;
	if (text) body += (serif ? `<path d="M58 111h28" stroke="${pal.clay}" stroke-width="2" stroke-linecap="round" opacity=".75"/>` +
		`<text x="72" y="131" text-anchor="middle" font-family="${CLAUDE_TOKENS.serif}" font-size="${fs}" fill="${pal.ink}">${text}</text>` :
		`<text x="72" y="132.5" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="700" letter-spacing="${raw.length > 9 ? 0.4 : 1.2}" fill="#000" opacity=".35">${text}</text>` +
		`<text x="72" y="131" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="700" letter-spacing="${raw.length > 9 ? 0.4 : 1.2}" fill="${style === "neon" ? "#ffffff" : pal.ink}">${text}</text>`);
	Object.assign(T, CLAUDE_TOKENS);
	return `<svg xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 144 144"><g data-app-design="claude" data-style="${style}">${body}</g></svg>`;
}

/** Monochrome action-list icon (white on transparent). */
export function claudeMonoSvg(glyph, size) {
	Object.assign(T, { ink: "#FFFFFF", muted: "#FFFFFF", faint: "#9A9A9A", clay: "#FFFFFF", clayLight: "#FFFFFF", surface: "#2D2D2D", cut: "#2D2D2D" });
	const art = (CLAUDE_ART[glyph] || CLAUDE_ART.newchat)(0);
	Object.assign(T, CLAUDE_TOKENS);
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="14 0 116 116">${art}</svg>`;
}

export const hasClaudeArt = (glyph) => Object.prototype.hasOwnProperty.call(CLAUDE_ART, glyph);
