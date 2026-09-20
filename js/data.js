/**
 * Swami Vivekananda College of Education - Official Institutional Data
 * Sourced from NCTE & WBBPE Gazettes, Staff Rosters, and University Admission Lists
 */

const SVCE_DATA = {
  college: {
    name: "Swami Vivekananda College of Education",
    shortName: "SVCE",
    bengaliName: "স্বামী বিবেকানন্দ কলেজ অফ এডুকেশন",
    managedBy: "Sahid Khudiram Memorial Trust",
    establishedYear: 2013,
    category: "Self-Financed Co-Educational Teacher Training Institution",
    president: "Hiranmoy Jana",
    principal: "Dr. Subhas Chandra Maity",
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
      email: "info@svcoledn.net.in",
      altEmail: "svcekeshiary@gmail.com",
      website: "www.svcoledn.net.in",
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

  // 10 Official Certified Staff Members (Session 2024-2026 / ERCAPP77)
  faculty: [
    {
      slNo: 1,
      name: "Dr. Subhas Chandra Maity",
      dob: "01/10/1980",
      age: 43,
      category: "General",
      designation: "Principal",
      type: "Regular",
      qualifications: {
        bEd: "Yes (63.72%)",
        mEd: "Yes (70.50%)",
        maMSc: "M.Sc. Environmental Science (64.25%)",
        other: "Ph.D / NET / UGC Compliant"
      },
      subject: "Environmental Science & Education Leadership",
      experience: "10 Years in SVCE",
      joiningDate: "23/07/2024",
      initialAppt: "22/07/2024",
      bio: "Dedicated administrator and educator with 10+ years of pioneering experience guiding pedagogical excellence in teacher education programs.",
      avatar: "fa-user-tie"
    },
    {
      slNo: 2,
      name: "Partha Sarathi Das",
      dob: "24/12/1981",
      age: 42,
      category: "OBC-B",
      designation: "Lecturer",
      type: "Regular",
      qualifications: {
        bEd: "Yes (68.10%)",
        mEd: "Yes (68.42%)",
        maMSc: "M.A. Bengali (69.00%)"
      },
      subject: "Bengali Pedagogy & Literature",
      experience: "8+ Years in Teacher Education",
      joiningDate: "23/07/2024",
      initialAppt: "22/07/2024",
      bio: "Specialist in language pedagogy, creative writing, and regional cultural integration in primary and secondary education.",
      avatar: "fa-book-open-reader"
    },
    {
      slNo: 3,
      name: "Samaresh Ojha",
      dob: "24/11/1980",
      age: 43,
      category: "OBC-B",
      designation: "Lecturer",
      type: "Regular",
      qualifications: {
        bEd: "Yes (60.80%)",
        mEd: "Yes (58.70%)",
        maMSc: "M.A. English (52.20%)"
      },
      subject: "English Language Teaching & Pedagogy",
      experience: "8 Years in SVCE",
      joiningDate: "23/07/2024",
      initialAppt: "22/07/2024",
      bio: "Focuses on communicative English teaching techniques, phonetics, and language lab methodologies for trainee teachers.",
      avatar: "fa-chalkboard-user"
    },
    {
      slNo: 4,
      name: "Narayan Chandra Sasmal",
      dob: "07/01/1974",
      age: 50,
      category: "General",
      designation: "Lecturer",
      type: "Regular",
      qualifications: {
        bEd: "Yes (56.50%)",
        mEd: "Yes (57.66%)",
        maMSc: "Master Degree in History & Env. Science (55.25%)"
      },
      subject: "History & Environmental Studies Pedagogy",
      experience: "8 Years in SVCE",
      joiningDate: "23/07/2024",
      initialAppt: "22/07/2024",
      bio: "Expertise in social science pedagogy, heritage education, and community-integrated field work.",
      avatar: "fa-landmark"
    },
    {
      slNo: 5,
      name: "Aparna Sarkar (Das)",
      dob: "26/12/1981",
      age: 42,
      category: "General",
      designation: "Lecturer",
      type: "Regular",
      qualifications: {
        bEd: "Yes (65.00%)",
        mEd: "No",
        maMSc: "M.A. Education (68.13%)"
      },
      subject: "Foundations of Education & Educational Psychology",
      experience: "6+ Years in Teacher Training",
      joiningDate: "23/07/2024",
      initialAppt: "22/07/2024",
      bio: "Passionate about child development psychology, inclusive classroom methods, and educational philosophy.",
      avatar: "fa-brain"
    },
    {
      slNo: 6,
      name: "Birendra Nath Maity",
      dob: "14/06/1984",
      age: 39,
      category: "General",
      designation: "Lecturer",
      type: "Regular",
      qualifications: {
        bEd: "Yes (66.50%)",
        mEd: "Yes (68.50%)",
        maMSc: "M.Sc. Science (57.90%)"
      },
      subject: "Science & Physical Science Pedagogy",
      experience: "5+ Years in Pedagogy Instruction",
      joiningDate: "23/07/2024",
      initialAppt: "22/07/2024",
      bio: "Specializes in laboratory demonstration, hands-on scientific experimentation, and STEM learning approaches.",
      avatar: "fa-flask"
    },
    {
      slNo: 7,
      name: "Harekrishna Som",
      dob: "03/08/1974",
      age: 49,
      category: "OBC-B",
      designation: "Lecturer",
      type: "Regular",
      qualifications: {
        bEd: "Yes (64.30%)",
        mEd: "Yes (69.13%)",
        maMSc: "M.Sc. Mathematics (58.30%)"
      },
      subject: "Mathematics Pedagogy & Logic",
      experience: "7+ Years in Teacher Training",
      joiningDate: "23/07/2024",
      initialAppt: "22/07/2024",
      bio: "Mentor in mathematical modeling, diagnostic testing, and engaging problem-solving pedagogical frameworks.",
      avatar: "fa-square-root-variable"
    },
    {
      slNo: 8,
      name: "Malay Kumar Shee",
      dob: "20/08/1989",
      age: 34,
      category: "General",
      designation: "Librarian",
      type: "Regular",
      qualifications: {
        bEd: "No",
        mEd: "No",
        maMSc: "B.LIS (Bachelor of Library & Information Science - 61.80%)"
      },
      subject: "Library & Information Science / Digital Resources",
      experience: "5+ Years in Academic Library Management",
      joiningDate: "23/07/2024",
      initialAppt: "22/07/2024",
      bio: "Oversees digital catalogue, e-learning resources, Inflibnet linkage, and book lending infrastructure.",
      avatar: "fa-book-bookmark"
    },
    {
      slNo: 9,
      name: "Tapas Kumar Santra",
      dob: "11/01/1974",
      age: 50,
      category: "General",
      designation: "Lecturer",
      type: "Regular",
      qualifications: {
        bEd: "B.P.Ed (61.83%)",
        mEd: "M.P.Ed (74.06%)",
        maMSc: "Master in Physical Education"
      },
      subject: "Physical & Health Education, Yoga & Sports",
      experience: "6 Years in SVCE",
      joiningDate: "08/12/2017",
      initialAppt: "07/12/2017",
      bio: "Coordinates sports meets, yoga workshops, wellness training, and outdoor physical conditioning programs.",
      avatar: "fa-person-running"
    },
    {
      slNo: 10,
      name: "Jayita Sahu",
      dob: "19/07/1988",
      age: 35,
      category: "General",
      designation: "Lecturer",
      type: "Regular",
      qualifications: {
        bEd: "No",
        mEd: "No",
        maMSc: "Master Degree in Performing Arts (62.62%)"
      },
      subject: "Performing Arts, Fine Arts, Music & Drama in Education",
      experience: "10 Years in SVCE",
      joiningDate: "09/09/2013",
      initialAppt: "08/09/2013",
      bio: "Directs cultural activities, theatre in education, fine arts craft workshops, and aesthetic training.",
      avatar: "fa-palette"
    }
  ],

  // 50 Official Admitted Students (Session 2025-27 / BSAEU / WBUTTEPA Central Admission Portal)
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
      renewalSessions: "Two-Year D.El.Ed Course for Academic Sessions 2023-2025 onwards",
      clauses: [
        "In terms of Sub-clause (10) of Clause 8 of NCTE Regulations - 2014 and Section 26A of West Bengal Primary Education (WBPE) Act 1973.",
        "Renewal of affiliation granted to SWAMI VIBEKANANDA COLLEGE OF EDUCATION, PASCHIM MEDINIPUR for 50 intake capacity.",
        "Institution shall adhere to mandatory disclosure in prescribed format and display up-to-date information on official website.",
        "Institution shall make available the list of students admitted on its official website."
      ]
    }
  },

  notices: [
    {
      id: "NTC-2025-04",
      date: "15 Oct 2025",
      badge: "Admission",
      title: "B.Ed & D.El.Ed Admission Session 2025-27 Verification Process",
      desc: "All candidates provisionally selected under Centralised Online Counseling are requested to bring original verification documents to the administrative office."
    },
    {
      id: "NTC-2025-03",
      date: "28 Sep 2025",
      badge: "Academic",
      title: "Commencement of Micro-Teaching & School Internship Phase",
      desc: "Orientation session for 2nd-year B.Ed and D.El.Ed trainees will be conducted in the Multi-Purpose Hall starting Monday at 10:30 AM."
    },
    {
      id: "NTC-2025-02",
      date: "15 Sep 2025",
      badge: "Compliance",
      title: "Annual Mandatory Disclosure & Self-Appraisal Report Updated",
      desc: "In compliance with NCTE Regulations 2014 Clause 7(11) & WBBPE norms, the institutional disclosure is publicly updated on the portal."
    },
    {
      id: "NTC-2025-01",
      date: "05 Sep 2025",
      badge: "Event",
      title: "Teachers' Day & National Education Celebration 2025",
      desc: "Special cultural program and lecture series on Swami Vivekananda's philosophy of education organized by the cultural club."
    }
  ]
};

// Export to global scope
if (typeof window !== 'undefined') {
  window.SVCE_DATA = SVCE_DATA;
}
