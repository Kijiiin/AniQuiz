// ============================================================
//  🎵  DATI DELLE OPENING – MODIFICA SOLO QUESTO FILE
// ============================================================
// Ogni domanda ha:
//   - videoId: ID del video YouTube (es. "pmanDg7IAHI")
//   - options: array di 4 titoli di anime in BASE64 (il primo deve essere il corretto)
//   - correct: il titolo corretto in BASE64 (uguale al primo di options)
// Per codificare un titolo in Base64 usa: btoa("Demon Slayer") -> "RGVtb24gU2xheWVy"
// ============================================================

const questions = [
    {
        videoId: "pmanDg7IAHI",
        options: ["RGVtb24gU2xheWVy", "SnVqdXRzdSBLYWlzZW4=", "TXkgSGVybyBBY2FkZW1pYQ==", "T25lIFBpZWNl"],
        correct: "RGVtb24gU2xheWVy"
    },
    {
        videoId: "yLtC7-5BqLw",
        options: ["VG9reW8gR2hvdWw=", "QXR0YWNrIG9uIFRpdGFu", "RGVhdGggTm90ZQ==", "RnVsbG1ldGFsIEFsY2hlbWlzdA=="],
        correct: "VG9reW8gR2hvdWw="
    },
    {
        videoId: "CEczVMyiVhc",
        options: ["QXR0YWNrIG9uIFRpdGFu", "U3dvcmQgQXJ0IE9ubGluZQ==", "TmFydXRv", "QmxlYWNo"],
        correct: "QXR0YWNrIG9uIFRpdGFu"
    },
    {
        videoId: "v-5CtLpD6NA",
        options: ["TmFydXRv", "RHJhZ29uIEJhbGw=", "T25lIFBpZWNl", "SHVudGVyIHggSHVudGVy"],
        correct: "TmFydXRv"
    },
    {
        videoId: "HKgGcEDg-sI",
        options: ["T25lIFBpZWNl", "QmxlYWNo", "RmFpcnkgVGFpbA==", "R2ludGFtYQ=="],
        correct: "T25lIFBpZWNl"
    },
    {
        videoId: "2r6nX7kMdQ0",
        options: ["U3dvcmQgQXJ0IE9ubGluZQ==", "TG9nIEhvcml6b24=", "Tm8gR2FtZSBObyBMaWZl", "QWNjZWwgV29ybGQ="],
        correct: "U3dvcmQgQXJ0IE9ubGluZQ=="
    },
    {
        videoId: "2F4rAqjWuFI",
        options: ["RnVsbG1ldGFsIEFsY2hlbWlzdA==", "SHVudGVyIHggSHVudGVy", "RmFpcnkgVGFpbA==", "TWFnaQ=="],
        correct: "RnVsbG1ldGFsIEFsY2hlbWlzdA=="
    },
    {
        videoId: "K8G-AuQTnX4",
        options: ["RGVhdGggTm90ZQ==", "Q29kZSBHZWFzcw==", "TW9uc3Rlcg==", "UGFyYW5vaWEgQWdlbnQ="],
        correct: "RGVhdGggTm90ZQ=="
    },
    {
        videoId: "9jVAnh1c8eM",
        options: ["TXkgSGVybyBBY2FkZW1pYQ==", "T25lIFB1bmNoIE1hbg==", "TW9iIFBzeWNobyAxMDA=", "QXNzYXNzaW5hdGlvbiBDbGFzc3Jvb20="],
        correct: "TXkgSGVybyBBY2FkZW1pYQ=="
    },
    {
        videoId: "7fZ4xWjPw4E",
        options: ["SnVqdXRzdSBLYWlzZW4=", "Q2hhaW5zYXcgTWFu", "RGVtb24gU2xheWVy", "VG9reW8gUmV2ZW5nZXJz"],
        correct: "SnVqdXRzdSBLYWlzZW4="
    }
];
