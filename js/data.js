/**
 * Swami Vibekananda College of Education - Official Institutional Data
 * Sourced from NCTE & WBBPE Gazettes, Staff Rosters, and University Admission Lists
 */

const SVCE_DATA = {
  college: {
    name: "Swami Vibekananda College of Education",
    shortName: "SVCE",
    bengaliName: "স্বামী বিবেকানন্দ কলেজ অফ এডুকেশন",
    managedBy: "Sahid Khudiram Memorial Trust",
    establishedYear: 2013,
    category: "Self-Financed Co-Educational Teacher Training Institution",
    president: "Hiranmoy Jana",
    principal: "Subhas Chandra Maity",
    address: {
      plotNo: "Plot No. L.R.-1859, R.S.-1530",
      village: "Vill.-Aurangabad",
      postOffice: "P.O.-Keshiary",
      blockTehsil: "Tehsil/Taluka-Keshiary",
      city: "Kharagpur",
      district: "Paschim Medinipur",
      state: "West Bengal",
      pincode: "721133",
      fullText: "Plot No. L.R.-1859, R.S.-1530, Vill.-Aurangabad, P.O.-Keshiary, Tehsil/Taluka-Keshiary, Town/City-Kharagpur, Dist.-Paschim Medinipur, West Bengal - 721133"
    },
    contact: {
      phone: "+91 97327 94252 / +91 (03223) 261450",
      email: "info@svcoledu.net.in",
      altEmail: "svcekeshiary@gmail.com",
      website: "www.svcoledu.net.in",
      officeHours: "Monday to Saturday: 10:00 AM - 05:00 PM"
    },
    recognitions: [
      {
        course: "D.El.Ed (Diploma in Elementary Education)",
        code: "ERCAPP77 / 2012",
        ncteOrderNo: "ERC/7-162.6.8/NCTE/D.El.Ed./2013/21191",
        orderDate: "15/10/2013",
        authority: "Eastern Regional Committee, National Council for Teacher Education (NCTE)",
        intake: 50,
        currentAffiliation: "West Bengal Board of Primary Education (WBBPE)",
        affiliationMemoNo: "83/WBBPE/DELED/2024/081-04/2023",
        affiliationDate: "06/03/2025",
        status: "Recognized & Affiliated"
      },
      {
        course: "B.Ed (Bachelor of Education)",
        code: "ERCAPP3967",
        ncteOrderNo: "F. No. 234.2.1(Part-2)/APP3967/B.Ed./2016/52099",
        orderDate: "04/04/2017",
        authority: "Eastern Regional Committee, National Council for Teacher Education (NCTE)",
        intake: 50,
        currentAffiliation: "Baba Saheb Ambedkar Education University (BSAEU / formerly WBUTTEPA) & Vidyasagar University",
        status: "Recognized & Affiliated"
      }
    ]
  },

  // B.Ed Certified Staff Members (Session 2026-2027 / ERCAPP3967 / BSAEU Affiliated) - Total 15 Members
  bedFaculty: [
    {
      slNo: 1,
      name: "Dr. Krishna Kumar",
      dob: "05/05/1977",
      age: "48 Y 9M",
      category: "GEN",
      designation: "Principal",
      type: "Regular",
      qualifications: {
        bEd: "Yes (63.77%)",
        mEd: "Yes (56.46%)",
        maEd: "No",
        masterSubject: "M.Sc. Zoology (64.33%)",
        phd: "Yes (Education)",
        netSet: "No"
      },
      subject: "Zoology",
      experience: "13.5 Years",
      recognizedExp: "Magadh Teacher's Training (B.Ed.) College",
      initialAppt: "28/06/2019",
      joiningDate: "01/07/2019",
      bio: "Principal and head of institution with 13.5+ years of academic and administrative leadership in recognized teacher training colleges.",
      avatar: "fa-user-tie"
    },
    {
      slNo: 2,
      name: "Aparna Sarkar",
      dob: "26/12/1981",
      age: "44 Y 1M",
      category: "GEN",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (65.00%)",
        mEd: "No",
        maEd: "M.A. Education (68.13%)",
        masterSubject: "No",
        phd: "No",
        netSet: "No"
      },
      subject: "Foundation",
      experience: "9.5 Years",
      recognizedExp: "9.5 Years",
      initialAppt: "23/04/2016",
      joiningDate: "27/04/2016",
      bio: "Foundations of education and pedagogical philosophy specialist with 9.5 years of devoted teaching experience.",
      avatar: "fa-brain"
    },
    {
      slNo: 3,
      name: "Samaresh Ojha",
      dob: "24/11/1980",
      age: "45 Y 2M",
      category: "OBC-B",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (60.81%)",
        mEd: "Yes (58.75%)",
        maEd: "No",
        masterSubject: "M.A. English (52.20%)",
        phd: "No",
        netSet: "No"
      },
      subject: "English",
      experience: "9.5 Years",
      recognizedExp: "9.5 Years",
      initialAppt: "23/04/2016",
      joiningDate: "27/04/2016",
      bio: "Language pedagogy instructor focusing on communicative English skills, phonetics, and curriculum methodologies.",
      avatar: "fa-chalkboard-user"
    },
    {
      slNo: 4,
      name: "Narayan Chandra Sasmal",
      dob: "07/01/1974",
      age: "52 Y 1M",
      category: "GEN",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (56.50%)",
        mEd: "Yes (57.66%)",
        maEd: "No",
        masterSubject: "M.A. History (55.25%)",
        phd: "No",
        netSet: "No"
      },
      subject: "History",
      experience: "9.5 Years",
      recognizedExp: "9.5 Years",
      initialAppt: "23/04/2016",
      joiningDate: "27/04/2016",
      bio: "Expert in historical perspectives of Indian education, social studies methodology, and heritage awareness.",
      avatar: "fa-landmark"
    },
    {
      slNo: 5,
      name: "Arun Jana",
      dob: "25/06/1980",
      age: "45 Y 7M",
      category: "GEN",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "B.F.A. (65.52%)",
        mEd: "M.F.A. (68.40%)",
        maEd: "No",
        masterSubject: "No",
        phd: "No",
        netSet: "No"
      },
      subject: "Fine Arts",
      experience: "9.5 Years",
      recognizedExp: "9.5 Years",
      initialAppt: "23/04/2016",
      joiningDate: "27/04/2016",
      bio: "Fine arts educator guiding teacher trainees in instructional art, visual communications, and SUPW crafting.",
      avatar: "fa-palette"
    },
    {
      slNo: 6,
      name: "Satinath Maity",
      dob: "11/06/1990",
      age: "35 Y 7M",
      category: "GEN",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (80.50%)",
        mEd: "Yes (76.75%)",
        maEd: "No",
        masterSubject: "M.A. Education (67.50%)",
        phd: "No",
        netSet: "Yes (UGC NET)"
      },
      subject: "Education",
      experience: "02 Years",
      recognizedExp: "02 Years",
      initialAppt: "27/09/2023",
      joiningDate: "05/10/2023",
      bio: "UGC NET qualified faculty member specializing in advanced pedagogical theories, assessment frameworks, and research.",
      avatar: "fa-book-open-reader"
    },
    {
      slNo: 7,
      name: "Harcharan Singh",
      dob: "08/01/1987",
      age: "39 Y 1M",
      category: "GEN",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (73.08%)",
        mEd: "Yes (67.67%)",
        maEd: "No",
        masterSubject: "M.Sc. Information Technology (65.70%)",
        phd: "No",
        netSet: "Yes (UGC NET)"
      },
      subject: "Computer Application",
      experience: "02 Years",
      recognizedExp: "02 Years",
      initialAppt: "27/09/2023",
      joiningDate: "05/10/2023",
      bio: "UGC NET qualified mentor directing educational technology, interactive ICT classroom tools, and computer applications.",
      avatar: "fa-laptop-code"
    },
    {
      slNo: 8,
      name: "Sujoy Chakraborty",
      dob: "10/11/1988",
      age: "37 Y 2M",
      category: "GEN",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (69.50%)",
        mEd: "Yes (77.10%)",
        maEd: "No",
        masterSubject: "M.Sc. Botany (61.90%)",
        phd: "No",
        netSet: "Yes (UGC NET)"
      },
      subject: "Life Science",
      experience: "02 Years",
      recognizedExp: "02 Years",
      initialAppt: "27/09/2023",
      joiningDate: "05/10/2023",
      bio: "UGC NET qualified pedagogue guiding life science laboratory practices, botany instruction, and environmental sciences.",
      avatar: "fa-dna"
    },
    {
      slNo: 9,
      name: "Debashis Halder",
      dob: "07/04/1995",
      age: "30 Y 10M",
      category: "SC",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (72.45%)",
        mEd: "No",
        maEd: "M.A. Education (77.60%)",
        masterSubject: "No",
        phd: "No",
        netSet: "Yes (SET)"
      },
      subject: "Foundation",
      experience: "02 Years",
      recognizedExp: "02 Years",
      initialAppt: "03/10/2023",
      joiningDate: "05/10/2023",
      bio: "WB SET qualified lecturer in pedagogical foundations, educational sociology, and learner psychology.",
      avatar: "fa-graduation-cap"
    },
    {
      slNo: 10,
      name: "Poulami Mondal",
      dob: "23/08/1991",
      age: "34 Y 5M",
      category: "SC",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (58.20%)",
        mEd: "Yes (74.00%)",
        maEd: "M.A. Education (89.13%)",
        masterSubject: "M.A./M.Sc. Geography (58.90%)",
        phd: "No",
        netSet: "Yes (UGC NET)"
      },
      subject: "Geography",
      experience: "02 Years",
      recognizedExp: "02 Years",
      initialAppt: "03/10/2023",
      joiningDate: "05/10/2023",
      bio: "UGC NET qualified faculty member with 89.13% in M.A. Education, teaching geography pedagogy and field techniques.",
      avatar: "fa-earth-asia"
    },
    {
      slNo: 11,
      name: "Chandan Pal",
      dob: "20/03/1989",
      age: "36 Y 10M",
      category: "GEN",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (70.50%)",
        mEd: "Yes (71.60%)",
        maEd: "M.A. Education (68.75%)",
        masterSubject: "M.A. Bengali (57.37%)",
        phd: "No",
        netSet: "Yes (SET)"
      },
      subject: "Bengali",
      experience: "02 Years",
      recognizedExp: "02 Years",
      initialAppt: "13/10/2023",
      joiningDate: "13/10/2023",
      bio: "WB SET qualified language educator fostering Bengali literary appreciation, grammar, and communicative methods.",
      avatar: "fa-book-bookmark"
    },
    {
      slNo: 12,
      name: "Sk Soriotulla",
      dob: "06/06/1995",
      age: "30 Y 8M",
      category: "OBC-A",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "B.P.Ed (73.37%)",
        mEd: "M.P.Ed (67.59%)",
        maEd: "No",
        masterSubject: "No",
        phd: "No",
        netSet: "Yes (SET)"
      },
      subject: "Health & Physical Education",
      experience: "02 Years",
      recognizedExp: "02 Years",
      initialAppt: "27/09/2023",
      joiningDate: "05/10/2023",
      bio: "WB SET qualified sports and wellness director managing athletics, yogic exercises, and physical conditioning.",
      avatar: "fa-person-running"
    },
    {
      slNo: 13,
      name: "Indranil Sarkar",
      dob: "15/02/1989",
      age: "36 Y 11M",
      category: "GEN",
      designation: "Librarian",
      type: "Regular",
      qualifications: {
        bEd: "B.LIS (68.12%)",
        mEd: "M.LIS (63.50%)",
        maEd: "No",
        masterSubject: "No",
        phd: "No",
        netSet: "Yes (UGC NET)"
      },
      subject: "Librarian",
      experience: "02 Years",
      recognizedExp: "02 Years",
      initialAppt: "03/10/2023",
      joiningDate: "05/10/2023",
      bio: "UGC NET certified librarian overseeing college library digitization, automated cataloguing, and e-journal portals.",
      avatar: "fa-book"
    },
    {
      slNo: 14,
      name: "Jayita Sahu",
      dob: "19/07/1988",
      age: "37 Y 6M",
      category: "GEN",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (91.55%)",
        mEd: "Yes (73.95%)",
        maEd: "No",
        masterSubject: "M.A. Rabindra Sangeet (62.62%)",
        phd: "No",
        netSet: "Yes (UGC NET)"
      },
      subject: "Performing Art",
      experience: "1.5 Years",
      recognizedExp: "1.5 Years",
      initialAppt: "28/03/2024",
      joiningDate: "01/04/2024",
      bio: "UGC NET qualified performing arts educator leading cultural heritage, theatrical techniques, and Rabindra Sangeet.",
      avatar: "fa-music"
    },
    {
      slNo: 15,
      name: "Harekrishna Som",
      dob: "03/08/1974",
      age: "51 Y 6M",
      category: "GEN",
      designation: "Assistant Professor",
      type: "Regular",
      qualifications: {
        bEd: "Yes (64.30%)",
        mEd: "Yes (69.13%)",
        maEd: "No",
        masterSubject: "M.Sc. Mathematics",
        phd: "No",
        netSet: "Yes (UGC NET)"
      },
      subject: "Mathematics",
      experience: "1.5 Years",
      recognizedExp: "1.5 Years",
      initialAppt: "28/03/2024",
      joiningDate: "01/04/2024",
      bio: "UGC NET qualified mathematics pedagogue with extensive expertise in mathematical logic, diagnostic testing, and analytics.",
      avatar: "fa-square-root-variable"
    }
  ],

  // D.El.Ed Certified Staff Members (Session 2024-2026 / ERCAPP77 / WBBPE Affiliated) - Total 10 Members
  deledFaculty: [
    {
      slNo: 1,
      name: "Subhas Chandra Maity",
      dob: "01/10/1980",
      age: "43 Years",
      category: "General",
      designation: "Principal (Regular)",
      type: "Regular",
      qualifications: {
        bEd: "Yes (63.72%)",
        mEd: "Yes (70.50%)",
        maEd: "No",
        masterSubject: "M.Sc. Environmental Science (64.25%)",
        phd: "No",
        netSet: "No"
      },
      subject: "Environmental Science",
      experience: "10 Years",
      recognizedExp: "Swami Vibekananda College of Education",
      initialAppt: "22/07/2024",
      joiningDate: "23/07/2024",
      bio: "Principal (Regular) heading institutional administration and teacher training with 10 years of dedicated experience.",
      avatar: "fa-user-tie"
    },
    {
      slNo: 2,
      name: "Partha Sarathi Das",
      dob: "24/12/1981",
      age: "42 Years",
      category: "OBC-B",
      designation: "Lecturer (Regular)",
      type: "Regular",
      qualifications: {
        bEd: "Yes (68.10%)",
        mEd: "Yes (68.42%)",
        maEd: "No",
        masterSubject: "M.A. Bengali (69.00%)",
        phd: "No",
        netSet: "No"
      },
      subject: "Bengali",
      experience: "No",
      recognizedExp: "No",
      initialAppt: "22/07/2024",
      joiningDate: "23/07/2024",
      bio: "Lecturer in Bengali language pedagogy, regional literature, and communicative classroom practices.",
      avatar: "fa-book-open-reader"
    },
    {
      slNo: 3,
      name: "Samaresh Ojha",
      dob: "24/11/1980",
      age: "43 Years",
      category: "OBC-B",
      designation: "Lecturer (Regular)",
      type: "Regular",
      qualifications: {
        bEd: "Yes (60.80%)",
        mEd: "Yes (58.70%)",
        maEd: "No",
        masterSubject: "M.A. English (52.20%)",
        phd: "No",
        netSet: "No"
      },
      subject: "English",
      experience: "8 Years",
      recognizedExp: "Swami Vibekananda College of Education",
      initialAppt: "22/07/2024",
      joiningDate: "23/07/2024",
      bio: "Lecturer focusing on communicative English methodologies, phonetics, and interactive language acquisition.",
      avatar: "fa-chalkboard-user"
    },
    {
      slNo: 4,
      name: "Narayan Chandra Sasmal",
      dob: "07/01/1974",
      age: "50 Years",
      category: "General",
      designation: "Lecturer (Regular)",
      type: "Regular",
      qualifications: {
        bEd: "Yes (56.50%)",
        mEd: "Yes (57.66%)",
        maEd: "No",
        masterSubject: "M.A. History & Env. Science (55.25%)",
        phd: "No",
        netSet: "No"
      },
      subject: "History & Environmental Science",
      experience: "8 Years",
      recognizedExp: "Swami Vibekananda College of Education",
      initialAppt: "22/07/2024",
      joiningDate: "23/07/2024",
      bio: "Expertise in history and environmental studies pedagogy with 8 years of institutional experience at SVCE.",
      avatar: "fa-landmark"
    },
    {
      slNo: 5,
      name: "Aparna Sarkar (Das)",
      dob: "26/12/1981",
      age: "42 Years",
      category: "General",
      designation: "Lecturer (Regular)",
      type: "Regular",
      qualifications: {
        bEd: "Yes (65.00%)",
        mEd: "No",
        maEd: "M.A. Education (68.13%)",
        masterSubject: "No",
        phd: "No",
        netSet: "No"
      },
      subject: "Foundation",
      experience: "-",
      recognizedExp: "-",
      initialAppt: "22/07/2024",
      joiningDate: "23/07/2024",
      bio: "Specialist in foundational pedagogical principles, educational psychology, and child development philosophy.",
      avatar: "fa-brain"
    },
    {
      slNo: 6,
      name: "Birendra Nath Maity",
      dob: "14/06/1984",
      age: "39 Years",
      category: "General",
      designation: "Lecturer (Regular)",
      type: "Regular",
      qualifications: {
        bEd: "Yes (66.50%)",
        mEd: "Yes (68.50%)",
        maEd: "No",
        masterSubject: "M.Sc. Science (57.90%)",
        phd: "No",
        netSet: "No"
      },
      subject: "Science",
      experience: "-",
      recognizedExp: "-",
      initialAppt: "22/07/2024",
      joiningDate: "23/07/2024",
      bio: "Science pedagogue instructing laboratory demonstration techniques and hands-on primary science activities.",
      avatar: "fa-flask"
    },
    {
      slNo: 7,
      name: "Harekrishna Som",
      dob: "03/08/1974",
      age: "49 Years",
      category: "OBC-B",
      designation: "Lecturer (Regular)",
      type: "Regular",
      qualifications: {
        bEd: "Yes (64.30%)",
        mEd: "Yes (69.13%)",
        maEd: "No",
        masterSubject: "M.Sc. Mathematics (58.30%)",
        phd: "No",
        netSet: "No"
      },
      subject: "Mathematics",
      experience: "-",
      recognizedExp: "-",
      initialAppt: "22/07/2024",
      joiningDate: "23/07/2024",
      bio: "Mathematics educator emphasizing fundamental numeric logic, diagnostic assessment, and analytical thinking.",
      avatar: "fa-square-root-variable"
    },
    {
      slNo: 8,
      name: "Malay Kumar Shee",
      dob: "20/08/1989",
      age: "34 Years",
      category: "General",
      designation: "Librarian",
      type: "Regular",
      qualifications: {
        bEd: "B.LIS (61.80%)",
        mEd: "No",
        maEd: "No",
        masterSubject: "No",
        phd: "No",
        netSet: "No"
      },
      subject: "Librarian",
      experience: "-",
      recognizedExp: "-",
      initialAppt: "22/07/2024",
      joiningDate: "23/07/2024",
      bio: "College librarian managing pedagogical reference volumes, textbook inventory, and digital catalogue resources.",
      avatar: "fa-book-bookmark"
    },
    {
      slNo: 9,
      name: "Tapas Kumar Santra",
      dob: "11/01/1974",
      age: "50 Years",
      category: "General",
      designation: "Lecturer (Regular)",
      type: "Regular",
      qualifications: {
        bEd: "B.P.Ed (61.83%)",
        mEd: "M.P.Ed (74.06%)",
        maEd: "No",
        masterSubject: "No",
        phd: "No",
        netSet: "No"
      },
      subject: "Physical & Health Education",
      experience: "6 Years",
      recognizedExp: "6 Years",
      initialAppt: "07/12/2017",
      joiningDate: "08/12/2017",
      bio: "Physical education instructor organizing sports, yoga conditioning, physical fitness, and health education.",
      avatar: "fa-person-running"
    },
    {
      slNo: 10,
      name: "Jayita Sahu",
      dob: "19/07/1988",
      age: "35 Years",
      category: "General",
      designation: "Lecturer (Regular)",
      type: "Regular",
      qualifications: {
        bEd: "No",
        mEd: "No",
        maEd: "No",
        masterSubject: "M.A. Performing Arts (62.62%)",
        phd: "No",
        netSet: "No"
      },
      subject: "Performing Arts",
      experience: "10 Years",
      recognizedExp: "10 Years",
      initialAppt: "08/09/2013",
      joiningDate: "09/09/2013",
      bio: "Directs aesthetic education, performing arts, drama in education, and cultural programs with 10 years at SVCE.",
      avatar: "fa-palette"
    }
  ],

  // Default faculty roster defaults to B.Ed
  get faculty() {
    return this.bedFaculty;
  },

  // 50 Official Admitted Students (Session 2026-2028 / BSAEU Central Admission Portal)
  admittedStudents: [
    { srNo: 1, appId: "ADM/BED/2025-27/672435", name: "Saheli Mishra", subject: "Life Science", type: "Fresher", category: "GEN" },
    { srNo: 2, appId: "ADM/BED/2025-27/333746", name: "Soumi Pal", subject: "Bengali", type: "Fresher", category: "GEN" },
    { srNo: 3, appId: "ADM/BED/2025-27/332013", name: "Sanchita Ghosh", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 4, appId: "ADM/BED/2025-27/971019", name: "Sanchita Jana", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 5, appId: "ADM/BED/2025-27/407991", name: "Rita Bera", subject: "Life Science", type: "Fresher", category: "SC" },
    { srNo: 6, appId: "ADM/BED/2025-27/841359", name: "Sunita Bera", subject: "Bengali", type: "Fresher", category: "SC" },
    { srNo: 7, appId: "ADM/BED/2025-27/437772", name: "Arpita Paul", subject: "Geography", type: "Fresher", category: "GEN" },
    { srNo: 8, appId: "ADM/BED/2025-27/537892", name: "Nabin Kr Jana", subject: "Life Science", type: "Fresher", category: "GEN" },
    { srNo: 9, appId: "ADM/BED/2025-27/951536", name: "Soumen Murmu", subject: "English", type: "Fresher", category: "ST" },
    { srNo: 10, appId: "ADM/BED/2025-27/655665", name: "Oindrila Sahoo", subject: "Life Science", type: "Fresher", category: "OBC-B" },
    { srNo: 11, appId: "ADM/BED/2025-27/136455", name: "Shila Pramanik", subject: "English", type: "Fresher", category: "SC" },
    { srNo: 12, appId: "ADM/BED/2025-27/947545", name: "Sumita Das", subject: "History", type: "Fresher", category: "GEN" },
    { srNo: 13, appId: "ADM/BED/2025-27/602472", name: "Jayashree Jana", subject: "Geography", type: "Fresher", category: "SC" },
    { srNo: 14, appId: "ADM/BED/2025-27/439746", name: "Minakshi Maity", subject: "Bengali", type: "Fresher", category: "GEN" },
    { srNo: 15, appId: "ADM/BED/2025-27/914244", name: "Debabrata Das", subject: "Computer Science", type: "Fresher", category: "SC" },
    { srNo: 16, appId: "ADM/BED/2025-27/552058", name: "Pradip Maity", subject: "History", type: "Fresher", category: "GEN" },
    { srNo: 17, appId: "ADM/BED/2025-27/407699", name: "Pritikona Khatua", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 18, appId: "ADM/BED/2025-27/344447", name: "Bidisha Giri", subject: "Life Science", type: "Fresher", category: "SC" },
    { srNo: 19, appId: "ADM/BED/2025-27/394659", name: "Ankita Roy", subject: "Computer Science", type: "Fresher", category: "GEN" },
    { srNo: 20, appId: "ADM/BED/2025-27/804128", name: "Sourav Ojha", subject: "Computer Science", type: "Fresher", category: "GEN" },
    { srNo: 21, appId: "ADM/BED/2025-27/298233", name: "Ankita Seal", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 22, appId: "ADM/BED/2025-27/293877", name: "Sadiya Khatun", subject: "History", type: "Fresher", category: "OBC-A" },
    { srNo: 23, appId: "ADM/BED/2025-27/532782", name: "Arunima Routh", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 24, appId: "ADM/BED/2025-27/682479", name: "Siuli Samanta", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 25, appId: "ADM/BED/2025-27/642533", name: "Priti Das", subject: "Music", type: "Fresher", category: "OBC-B" },
    { srNo: 26, appId: "ADM/BED/2025-27/536159", name: "Sushovan Ghorai", subject: "Mathematics", type: "Fresher", category: "SC" },
    { srNo: 27, appId: "ADM/BED/2025-27/724723", name: "Subhradyuti Jana", subject: "Mathematics", type: "Fresher", category: "GEN" },
    { srNo: 28, appId: "ADM/BED/2025-27/553353", name: "Nilima Sahoo", subject: "Mathematics", type: "Fresher", category: "OBC-B" },
    { srNo: 29, appId: "ADM/BED/2025-27/805621", name: "Lipika Ghorai", subject: "Music", type: "Fresher", category: "SC" },
    { srNo: 30, appId: "ADM/BED/2025-27/909728", name: "Sruti Panda", subject: "Life Science", type: "Fresher", category: "GEN" },
    { srNo: 31, appId: "ADM/BED/2025-27/965143", name: "Mahan De", subject: "English", type: "Fresher", category: "OBC-B" },
    { srNo: 32, appId: "ADM/BED/2025-27/195279", name: "Shreya Das", subject: "History", type: "Fresher", category: "GEN" },
    { srNo: 33, appId: "ADM/BED/2025-27/237409", name: "Shantanu Routh", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 34, appId: "ADM/BED/2025-27/164601", name: "Arunima Dash", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 35, appId: "ADM/BED/2025-27/158070", name: "Tapas Samanta", subject: "Geography", type: "Fresher", category: "GEN" },
    { srNo: 36, appId: "ADM/BED/2025-27/860829", name: "Isha Mahata", subject: "English", type: "Fresher", category: "OBC-B" },
    { srNo: 37, appId: "ADM/BED/2025-27/534828", name: "Puja Raul", subject: "Bengali", type: "Fresher", category: "OBC-B" },
    { srNo: 38, appId: "ADM/BED/2025-27/754630", name: "Pallabi Das", subject: "Life Science", type: "Fresher", category: "GEN" },
    { srNo: 39, appId: "ADM/BED/2025-27/848623", name: "Ananda Bera", subject: "History", type: "Fresher", category: "GEN" },
    { srNo: 40, appId: "ADM/BED/2025-27/967067", name: "Sunita Mahata", subject: "English", type: "Fresher", category: "OBC-B" },
    { srNo: 41, appId: "ADM/BED/2025-27/635994", name: "Bikram Mandi", subject: "History", type: "Fresher", category: "ST" },
    { srNo: 42, appId: "ADM/BED/2025-27/847252", name: "Amritalal Adak", subject: "Life Science", type: "Fresher", category: "GEN" },
    { srNo: 43, appId: "ADM/BED/2025-27/509961", name: "Sidhu Murmu", subject: "History", type: "Fresher", category: "ST" },
    { srNo: 44, appId: "ADM/BED/2025-27/726158", name: "Pushpa Mahata", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 45, appId: "ADM/BED/2025-27/937498", name: "Saswati Das", subject: "Bengali", type: "Fresher", category: "GEN" },
    { srNo: 46, appId: "ADM/BED/2025-27/126738", name: "Tuhina Rana", subject: "Bengali", type: "Fresher", category: "GEN" },
    { srNo: 47, appId: "ADM/BED/2025-27/582651", name: "Kanchan Dhru", subject: "English", type: "Fresher", category: "GEN" },
    { srNo: 48, appId: "ADM/BED/2025-27/704021", name: "Tikli Sing", subject: "History", type: "Fresher", category: "ST" },
    { srNo: 49, appId: "ADM/BED/2025-27/532277", name: "Sumana Karan", subject: "Bengali", type: "Fresher", category: "GEN" },
    { srNo: 50, appId: "ADM/BED/2025-27/612886", name: "Rima Mahata", subject: "Bengali", type: "Fresher", category: "GEN" }
  ],

  // Mandatory Disclosures & Official Legal Documents
  disclosures: {
    landParticulars: {
      plotNo: "L.R.-1859, R.S.-1530",
      mouza: "Aurangabad",
      jlNo: "214",
      khatianNo: "542 / 891",
      totalLandArea: "3,500+ Sq. Meters (Continuous, Owned by Sahid Khudiram Memorial Trust)",
      builtUpArea: "2,200+ Sq. Meters",
      buildingType: "Multi-Storey RCC Pucca Educational Complex with Fire Safety & Disabled Accessibility"
    },
    facilities: [
      { name: "Multi-Purpose Hall", capacity: "250+ Seating", icon: "fa-people-roof", desc: "Acoustically treated auditorium equipped with audio-visual projection for seminars and cultural programs." },
      { name: "ICT & Computer Laboratory", capacity: "35 High-Speed Workstations", icon: "fa-computer", desc: "Equipped with broadband internet, projection system, and interactive digital educational software tools." },
      { name: "Science & Mathematics Laboratory", capacity: "Full Batch Apparatus", icon: "fa-flask-vial", desc: "Equipped with physical science, life science specimens, digital microscopes, and math manipulatives." },
      { name: "Psychology & Guidance Resource Lab", capacity: "Standard NCTE Battery", icon: "fa-brain", desc: "Standardized psychological testing apparatus, intelligence scales, aptitude kits, and counseling cabin." },
      { name: "Educational Technology & Language Lab", capacity: "Audio-Visual Booths", icon: "fa-headphones", desc: "Language development audio software, recording modules, and communicative training setups." },
      { name: "Library & Resource Reading Hall", capacity: "5,500+ Volumes, 15+ Journals", icon: "fa-book-bookmark", desc: "Extensive collection of pedagogical reference books, national & international journals, and digital catalogue." },
      { name: "Sports & Physical Fitness Ground", capacity: "Outdoor Field & Yoga Hall", icon: "fa-volleyball", desc: "Dedicated ground for athletics, football, cricket, volleyball, plus indoor yoga and physical health studio." },
      { name: "Art & Craft Workshop / Performing Arts Studio", capacity: "Creative Studio", icon: "fa-palette", desc: "Dedicated workshop for SUPW, fine arts, model making, theatrical rehearsals, and music instruction." }
    ],
    ncteDeledOrder: {
      orderNo: "ERC/7-162.6.8/NCTE/D.El.Ed./2013/21191",
      date: "15/10/2013",
      gazetteNotif: "TO BE PUBLISHED IN GAZETTE OF INDIA PART - III, SECTION 4",
      intake: "50 (Fifty)",
      session: "From academic session 2014-2015",
      regulations: "Clause 7(11) of NCTE Regulations, 2009 / 2014",
      clauses: [
        "The institution shall comply with the various other norms and standards prescribed in the NCTE regulations, as amended from time to time.",
        "The institution shall make admission only after it obtains affiliation from the examining body in terms of clause 8(12) of NCTE Regulations, 2009.",
        "The institution shall ensure that the required number of academic staff for conducting the course is always in position.",
        "The institution shall submit to the Regional Committee a Self-Appraisal Report at the end of each academic year along with the statement of annual accounts duly audited by a Chartered Accountant.",
        "The institution shall maintain & update its Website as per provisions of NCTE Regulations and always display Mandatory Disclosure."
      ]
    },
    ncteBedOrder: {
      orderNo: "F. No. 234.2.1(Part-2)/APP3967/B.Ed./2016/52099",
      date: "04.04.2017",
      gazetteNotif: "TO BE PUBLISHED IN GAZETTE OF INDIA (EXTRAORDINARY) PART-III, SECTION 4",
      intake: "50 (One basic unit)",
      session: "From academic session 2017-2018",
      regulations: "Clause 7(16) of NCTE (Recognition Norms & Procedure) Regulations, 2014",
      clauses: [
        "Grant of permission for B.Ed. Course of two years duration with an annual intake of 50 students.",
        "Affiliated with Baba Saheb Ambedkar Education University (BSAEU / WBUTTEPA) & Vidyasagar University.",
        "Strict adherence to NCTE Staff qualification norms, pay structure through account payee cheque, and infrastructural specifications."
      ]
    },
    wbbpeOrder: {
      memoNo: "83/WBBPE/DELED/2024/081-04/2023",
      date: "06/03/2025",
      body: "West Bengal Board of Primary Education (Acharya Prafulla Chandra Bhavan, Salt Lake, Kolkata - 700091)",
      intake: "50 (Fifty) - Bengali Medium Institute",
      renewalSessions: "Two-Year D.El.Ed Course for Academic Sessions 2024-2026 onwards",
      clauses: [
        "In terms of Sub-clause (10) of Clause 8 of NCTE Regulations - 2014 and Section 26A of West Bengal Primary Education (WBPE) Act 1973.",
        "Renewal of affiliation granted to SWAMI VIBEKANANDA COLLEGE OF EDUCATION, PASCHIM MEDINIPUR for 50 intake capacity.",
        "Institution shall adhere to mandatory disclosure in prescribed format and display up-to-date information on official website.",
        "Institution shall make available the list of students admitted on its official website."
      ]
    }
  },

  // Official PDF Documents Registry
  documents: [
    {
      id: "doc-bed-recog",
      title: "NCTE Recognition Order Copy (B.Ed Course)",
      filename: "B.ED . RECOGNISED COPY.pdf",
      url: "assets/pdf/B.ED . RECOGNISED COPY.pdf",
      category: "NCTE Recognition",
      orderNo: "F. No. 234.2.1(Part-2)/APP3967/B.Ed./2016/52099",
      date: "04/04/2017",
      size: "810 KB"
    },
    {
      id: "doc-deled-recog",
      title: "NCTE Recognition Order Copy (D.El.Ed Course)",
      filename: "NCTE ORDER COPY  D.EL.ED.pdf",
      url: "assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf",
      category: "NCTE Recognition",
      orderNo: "ERC/7-162.6.8/NCTE/D.El.Ed./2013/21191",
      date: "15/10/2013",
      size: "116 KB"
    },
    {
      id: "doc-bed-affil",
      title: "B.Ed Affiliation Order Copy (2025 - 2026)",
      filename: "B.ED. AFFILIATION COPY 2025 - 2026.pdf",
      url: "assets/pdf/B.ED. AFFILIATION COPY 2025 - 2026.pdf",
      category: "University Affiliation",
      orderNo: "BSAEU/AFFIV/16033/2025",
      date: "2025-2026",
      size: "848 KB"
    },
    {
      id: "doc-deled-affil",
      title: "D.El.Ed Affiliation Order Copy (WBBPE)",
      filename: "D.EL.ED AFFILIATION COPY.pdf",
      url: "assets/pdf/D.EL.ED AFFILIATION COPY.pdf",
      category: "State Board Affiliation",
      orderNo: "83/WBBPE/DELED/2024/081-04/2023",
      date: "06/03/2025",
      size: "181 KB"
    },
    {
      id: "doc-bed-noc",
      title: "No Objection Certificate (NOC) for B.Ed from Vidyasagar University",
      filename: "NOC  FOR B.ED..pdf",
      url: "assets/pdf/NOC  FOR B.ED..pdf",
      category: "University NOC",
      orderNo: "VU/REG/NOC/B.Ed/2015",
      date: "04/06/2015",
      size: "67 KB"
    },
    {
      id: "doc-fire-cert",
      title: "Government Fire Safety Certificate (WB Fire & Emergency Services)",
      filename: "FIRE CERTIFICATE.pdf",
      url: "assets/pdf/FIRE CERTIFICATE.pdf",
      category: "Statutory Safety",
      orderNo: "Memo no: FSR/0125186231500164",
      date: "04/10/2023",
      size: "463 KB"
    },
    {
      id: "doc-bed-faculty",
      title: "Official Certified B.Ed Faculty & Staff List",
      filename: "B. Ed teacher list.pdf",
      url: "assets/pdf/B. Ed teacher list.pdf",
      category: "Faculty & Staff",
      orderNo: "BSAEU Certified Roster (15 Members)",
      date: "Session 2026-2027",
      size: "3.0 MB"
    },
    {
      id: "doc-deled-faculty",
      title: "Official Certified D.El.Ed Faculty & Staff List",
      filename: "D.EL.ED Teacher list.pdf",
      url: "assets/pdf/D.EL.ED Teacher list.pdf",
      category: "Faculty & Staff",
      orderNo: "WBBPE Approved Roster (8 Members)",
      date: "Session 2024-2026",
      size: "2.4 MB"
    },
    {
      id: "doc-student-list",
      title: "Official Admitted B.Ed Student List (50 Enrolled Trainees)",
      filename: "STUDENT LIST  B.ED 2025-2027.pdf",
      url: "assets/pdf/STUDENT LIST  B.ED 2025-2027.pdf",
      category: "Student Admissions",
      orderNo: "Centralised Admission Roster",
      date: "Session 2026-2028",
      size: "170 KB"
    }
  ],

  notices: [
    {
      id: "NTC-2026-04",
      date: "15 Oct 2026",
      badge: "Admission 2026-28",
      title: "B.Ed & D.El.Ed Admission Session 2026-28 Document Verification & Central Counseling Active",
      desc: "All candidates provisionally selected under Centralised Online Counseling for Session 2026-28 are requested to bring original verification documents to the administrative office."
    },
    {
      id: "NTC-2026-03",
      date: "28 Sep 2026",
      badge: "Academic 2026-28",
      title: "Commencement of Micro-Teaching, Orientation & Foundation Classes for Session 2026-28",
      desc: "Academic orientation session for B.Ed and D.El.Ed admitted trainees (Session 2026–2028) in the Multi-Purpose Hall."
    },
    {
      id: "NTC-2026-02",
      date: "15 Sep 2026",
      badge: "Compliance 2026-28",
      title: "Annual Mandatory Public Disclosure & NCTE Roster Approved for Session 2026-28",
      desc: "In compliance with NCTE Regulations 2014 & WBBPE/BSAEU norms, the institutional disclosure is publicly updated on the portal for Session 2026-28."
    },
    {
      id: "NTC-2026-01",
      date: "05 Sep 2026",
      badge: "Students 2026-28",
      title: "50 Enrolled B.Ed Student Database Published for Session 2026-28",
      desc: "Official roster of 50 admitted B.Ed candidates (Session 2026-28) is published on the portal as per university directives."
    }
  ]
};

// Export to global scope
if (typeof window !== 'undefined') {
  window.SVCE_DATA = SVCE_DATA;
}
