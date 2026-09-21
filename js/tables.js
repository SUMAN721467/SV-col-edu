/**
 * Swami Vibekananda College of Education - Tables & Data Rendering Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initStudentTable();
  initFacultyListings();
  initTabs();
});

/* ==========================================================================
   Students Table Management (50 Admitted Students)
   ========================================================================== */
function initStudentTable() {
  const tableBody = document.getElementById('students-table-body');
  if (!tableBody || !window.SVCE_DATA || !window.SVCE_DATA.admittedStudents) return;

  const allStudents = window.SVCE_DATA.admittedStudents;
  let filteredStudents = [...allStudents];
  
  let currentPage = 1;
  let pageSize = 15;

  const searchInput = document.getElementById('student-search');
  const subjectFilter = document.getElementById('student-subject-filter');
  const categoryFilter = document.getElementById('student-category-filter');
  const entriesCount = document.getElementById('students-entries-count');
  const paginationContainer = document.getElementById('students-pagination');

  // Populate Subject Filter Options Dynamically
  if (subjectFilter) {
    const subjects = Array.from(new Set(allStudents.map(s => s.subject))).sort();
    subjects.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub;
      opt.textContent = sub;
      subjectFilter.appendChild(opt);
    });
  }

  function applyFilters() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const selectedSubject = subjectFilter ? subjectFilter.value : 'all';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

    filteredStudents = allStudents.filter(student => {
      const matchSearch = student.name.toLowerCase().includes(query) ||
                          student.appId.toLowerCase().includes(query) ||
                          student.subject.toLowerCase().includes(query);
      const matchSubject = (selectedSubject === 'all' || student.subject === selectedSubject);
      const matchCategory = (selectedCategory === 'all' || student.category === selectedCategory);
      return matchSearch && matchSubject && matchCategory;
    });

    currentPage = 1;
    renderTable();
  }

  function renderTable() {
    const total = filteredStudents.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);
    const paginatedItems = filteredStudents.slice(startIndex, endIndex);

    if (paginatedItems.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2.5rem; color: #64748B;">
            <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #CBD5E1;"></i>
            No student records matching the selected search criteria.
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = paginatedItems.map(s => `
        <tr>
          <td style="font-weight: 700; color: #0A1E3F;">${s.srNo}</td>
          <td style="font-family: monospace; font-size: 0.85rem; color: #475569; font-weight: 600;">${s.appId}</td>
          <td style="font-weight: 700; color: #0A1E3F;">${s.name}</td>
          <td><span style="font-weight: 600; color: #0369A1;">${s.subject}</span></td>
          <td><span class="table-badge badge-fresher">${s.type}</span></td>
          <td><span class="table-badge badge-${s.category.toLowerCase().replace('-', '')}">${s.category}</span></td>
        </tr>
      `).join('');
    }

    if (entriesCount) {
      entriesCount.innerText = total > 0 ? `Showing ${startIndex + 1} to ${endIndex} of ${total} entries` : `Showing 0 entries`;
    }

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!paginationContainer) return;
    let buttonsHtml = `
      <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changeStudentPage(${currentPage - 1})">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      buttonsHtml += `
        <button class="page-btn ${currentPage === i ? 'active' : ''}" onclick="changeStudentPage(${i})">${i}</button>
      `;
    }

    buttonsHtml += `
      <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changeStudentPage(${currentPage + 1})">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    `;

    paginationContainer.innerHTML = buttonsHtml;
  }

  window.changeStudentPage = function(page) {
    currentPage = page;
    renderTable();
  };

  // Event Listeners
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (subjectFilter) subjectFilter.addEventListener('change', applyFilters);
  if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);

  // Initial Render
  renderTable();

  // Export to CSV Function
  window.exportStudentsCSV = function() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Serial No,Application ID,Applicant Name,Subject,Applicant Type,Category\n";
    filteredStudents.forEach(s => {
      csvContent += `${s.srNo},"${s.appId}","${s.name}","${s.subject}","${s.type}","${s.category}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SVCE_BEd_Admitted_Students_2026_28.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}

/* ==========================================================================
   Faculty Listings & Roster Rendering
   ========================================================================== */
/* ==========================================================================
   Faculty Listings & Roster Rendering (B.Ed & D.El.Ed Courses)
   ========================================================================== */
function initFacultyListings() {
  const facultyGrid = document.getElementById('faculty-cards-grid');
  const facultyTableBody = document.getElementById('faculty-table-body');
  if (!window.SVCE_DATA) return;

  let currentCourse = 'bed'; // Default to B.Ed
  let searchQuery = '';
  let selectedCategory = 'all';
  let selectedSubject = 'all';

  const courseTabs = document.querySelectorAll('.faculty-course-tab');
  const searchInput = document.getElementById('faculty-search');
  const categoryFilter = document.getElementById('faculty-category-filter');
  const subjectFilter = document.getElementById('faculty-subject-filter');
  const certBanner = document.getElementById('faculty-cert-banner');
  const subtitleElem = document.getElementById('faculty-roster-subtitle');
  const totalCountBadge = document.getElementById('faculty-total-count');
  const netCountBadge = document.getElementById('faculty-net-count');

  function getFacultyData() {
    if (currentCourse === 'bed') {
      return window.SVCE_DATA.bedFaculty || [];
    } else {
      return window.SVCE_DATA.deledFaculty || [];
    }
  }

  function populateSubjectFilter() {
    if (!subjectFilter) return;
    const list = getFacultyData();
    const subjects = Array.from(new Set(list.map(f => f.subject))).sort();
    subjectFilter.innerHTML = '<option value="all">All Subjects / Domains</option>';
    subjects.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub;
      opt.textContent = sub;
      subjectFilter.appendChild(opt);
    });
  }

  function updateCertBanner() {
    const pdfBtn = document.getElementById('faculty-pdf-btn');
    if (currentCourse === 'bed') {
      if (pdfBtn) {
        pdfBtn.setAttribute('href', 'assets/pdf/B. Ed teacher list.pdf');
        pdfBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> View B.Ed Signed PDF';
      }
      if (certBanner) {
        certBanner.innerHTML = `
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
              <i class="fa-solid fa-stamp" style="font-size: 1.5rem; color: #2563EB; margin-top: 0.2rem; flex-shrink: 0;"></i>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.25rem; color: #1E3A8A;">
                  Statutory Certification • B.Ed Course (Session 2026–2027 • NCTE Code: ERCAPP3967 • College Code: 16033)
                </div>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.55; color: #1E3A8A;">
                  This is to certify that the appointment of the above <strong>15 teaching staff members</strong> (Principal, Assistant Professors &amp; Librarian) has been made on the basis of recommendation of the selection committee constituted as per the policy of the UGC / Affiliating Body and NCTE norms. Certified by <strong>Hiranmoy Jana</strong> (President, SVCE) and <strong>Signed &amp; Verified by Assistant Registrar (Actg), Baba Saheb Ambedkar Education University (BSAEU / erstwhile WBUTTEPA)</strong>.
                </p>
              </div>
            </div>
            <a href="assets/pdf/B. Ed teacher list.pdf" target="_blank" class="btn-primary" style="font-size: 0.8rem; padding: 0.45rem 0.85rem; white-space: nowrap; flex-shrink: 0;">
              <i class="fa-solid fa-file-pdf"></i> Open Verified PDF
            </a>
          </div>
        `;
      }
      if (subtitleElem) {
        subtitleElem.innerText = "ERC, NCTE Delhi Format • Session 2026–2027 • NCTE Code: ERCAPP3967 • BSAEU Affiliated (50 Basic Unit)";
      }
    } else {
      if (pdfBtn) {
        pdfBtn.setAttribute('href', 'assets/pdf/D.EL.ED Teacher list.pdf');
        pdfBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> View D.El.Ed Signed PDF';
      }
      if (certBanner) {
        certBanner.innerHTML = `
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
              <i class="fa-solid fa-stamp" style="font-size: 1.5rem; color: #2563EB; margin-top: 0.2rem; flex-shrink: 0;"></i>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.25rem; color: #1E3A8A;">
                  Statutory Certification • D.El.Ed Course (Session 2024–2026 • NCTE Code: ERCAPP77 • 50 Students Unit)
                </div>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.55; color: #1E3A8A;">
                  All teaching staff members have been appointed on the basis of recommendation of the selection committee constituted as per NCTE Norms (2014 &amp; 2009) and paid salary as prescribed through account payee cheque. Certified by <strong>Hiranmoy Jana</strong> (President, SVCE - 16/06/2024), <strong>Representative Nominee (DIET Jhargram - 16/06/2024)</strong>, and Counter-Signed by <strong>Secretary, West Bengal Board of Primary Education (WBBPE - 17/08/2024)</strong>.
                </p>
              </div>
            </div>
            <a href="assets/pdf/D.EL.ED Teacher list.pdf" target="_blank" class="btn-primary" style="font-size: 0.8rem; padding: 0.45rem 0.85rem; white-space: nowrap; flex-shrink: 0;">
              <i class="fa-solid fa-file-pdf"></i> Open Verified PDF
            </a>
          </div>
        `;
      }
      if (subtitleElem) {
        subtitleElem.innerText = "ERC, NCTE Bhubaneswar Format • Session 2024–2026 • NCTE Code: ERCAPP77 • WBBPE Affiliated (50 Basic Unit)";
      }
    }
  }

  function filterFaculty() {
    const list = getFacultyData();
    const q = searchQuery.toLowerCase().trim();

    return list.filter(f => {
      const nameMatch = f.name.toLowerCase().includes(q);
      const subMatch = f.subject.toLowerCase().includes(q);
      const desigMatch = f.designation.toLowerCase().includes(q);
      const catMatch = (selectedCategory === 'all' || f.category.toLowerCase().replace(/\s+/g, '') === selectedCategory.toLowerCase().replace(/\s+/g, ''));
      const subjectMatch = (selectedSubject === 'all' || f.subject === selectedSubject);

      const qualificationsText = JSON.stringify(f.qualifications).toLowerCase();
      const qualMatch = qualificationsText.includes(q);

      return (nameMatch || subMatch || desigMatch || qualMatch) && catMatch && subjectMatch;
    });
  }

  function renderFaculty() {
    const list = filterFaculty();
    const fullList = getFacultyData();

    if (totalCountBadge) {
      totalCountBadge.innerText = `${fullList.length} Appointed Staff`;
    }
    if (netCountBadge) {
      if (currentCourse === 'bed') {
        const netCount = fullList.filter(f => f.qualifications && (f.qualifications.netSet?.includes('Yes') || f.qualifications.netSet?.includes('NET') || f.qualifications.phd?.includes('Yes'))).length;
        netCountBadge.innerText = `${netCount} UGC-NET / SET / Ph.D`;
      } else {
        netCountBadge.innerText = `10 NCTE Norms Approved`;
      }
    }

    // Render Cards Grid
    if (facultyGrid) {
      if (list.length === 0) {
        facultyGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); color: #64748B;">
            <i class="fa-solid fa-user-xmark" style="font-size: 2.5rem; color: #CBD5E1; margin-bottom: 0.75rem; display: block;"></i>
            No faculty members found matching the specified filters.
          </div>
        `;
      } else {
        facultyGrid.innerHTML = list.map(f => {
          const isNet = f.qualifications.netSet && f.qualifications.netSet !== 'No';
          const isPhd = f.qualifications.phd && f.qualifications.phd !== 'No';
          return `
            <div class="faculty-card">
              <div class="faculty-card-header">
                <div class="faculty-avatar">
                  <i class="fa-solid ${f.avatar || 'fa-user-tie'}"></i>
                </div>
                <div class="faculty-meta">
                  <h3>${f.name}</h3>
                  <span class="faculty-badge">${f.designation}</span>
                  <div style="font-size: 0.75rem; color: #64748B; margin-top: 0.2rem; font-weight: 600;">${f.subject}</div>
                </div>
              </div>
              <div class="faculty-card-body">
                <div class="faculty-detail-row">
                  <strong>Academic Credentials:</strong>
                  <span>
                    ${f.qualifications.masterSubject && f.qualifications.masterSubject !== 'No' ? f.qualifications.masterSubject + ' • ' : ''}
                    ${f.qualifications.bEd && f.qualifications.bEd !== 'No' ? 'B.Ed: ' + f.qualifications.bEd : ''}
                    ${f.qualifications.mEd && f.qualifications.mEd !== 'No' ? ' • M.Ed: ' + f.qualifications.mEd : ''}
                    ${f.qualifications.maEd && f.qualifications.maEd !== 'No' ? ' • ' + f.qualifications.maEd : ''}
                  </span>
                </div>
                ${(isNet || isPhd) ? `
                  <div class="faculty-detail-row">
                    <strong>Statutory Clearance:</strong>
                    <span style="color: #047857; display: flex; align-items: center; gap: 0.35rem;">
                      <i class="fa-solid fa-circle-check"></i> ${isPhd ? f.qualifications.phd : ''} ${isNet ? (isPhd ? ' • ' : '') + f.qualifications.netSet : ''}
                    </span>
                  </div>
                ` : ''}
                <div class="faculty-detail-row">
                  <strong>Teaching Experience:</strong>
                  <span>${f.experience} ${f.recognizedExp ? '(' + f.recognizedExp + ')' : ''}</span>
                </div>
                <div class="faculty-detail-row">
                  <strong>Joining & Appointment:</strong>
                  <span>Joined: ${f.joiningDate} • Category: ${f.category}</span>
                </div>
                <p style="font-size: 0.85rem; color: #64748B; margin-top: 0.75rem; font-style: italic; border-top: 1px dashed #E2E8F0; padding-top: 0.75rem;">
                  "${f.bio}"
                </p>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Render Full Particulars Table
    if (facultyTableBody) {
      if (list.length === 0) {
        facultyTableBody.innerHTML = `
          <tr>
            <td colspan="9" style="text-align: center; padding: 2.5rem; color: #64748B;">
              No matching records in the official roster.
            </td>
          </tr>
        `;
      } else {
        facultyTableBody.innerHTML = list.map(f => {
          const badgeClass = f.category.toLowerCase().includes('sc') ? 'badge-sc' : 
                             f.category.toLowerCase().includes('st') ? 'badge-st' : 
                             f.category.toLowerCase().includes('obc') ? 'badge-obc' : 'badge-gen';
          return `
            <tr>
              <td style="font-weight: 700; color: #0A1E3F; text-align: center;">${f.slNo}</td>
              <td style="font-weight: 700; color: #0A1E3F; min-width: 170px;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <i class="fa-solid ${f.avatar || 'fa-user-tie'}" style="color: var(--accent-gold); font-size: 1rem;"></i>
                  <div>
                    ${f.name}
                    <div style="font-size: 0.75rem; color: #64748B; font-weight: 500;">DOB: ${f.dob} (${f.age})</div>
                  </div>
                </div>
              </td>
              <td><span class="table-badge ${badgeClass}">${f.category}</span></td>
              <td><strong style="color: #0A1E3F;">${f.designation}</strong></td>
              <td><span style="color: #0369A1; font-weight: 600;">${f.subject}</span></td>
              <td style="font-size: 0.8rem; line-height: 1.45; min-width: 180px;">
                ${f.qualifications.bEd !== 'No' ? `<div><strong>B.Ed / UG:</strong> ${f.qualifications.bEd}</div>` : ''}
                ${f.qualifications.mEd !== 'No' ? `<div><strong>M.Ed:</strong> ${f.qualifications.mEd}</div>` : ''}
                ${f.qualifications.maEd && f.qualifications.maEd !== 'No' ? `<div><strong>M.A.(Ed):</strong> ${f.qualifications.maEd}</div>` : ''}
                ${f.qualifications.masterSubject && f.qualifications.masterSubject !== 'No' ? `<div><strong>Master:</strong> ${f.qualifications.masterSubject}</div>` : ''}
              </td>
              <td style="font-size: 0.8rem; line-height: 1.45; min-width: 130px;">
                ${f.qualifications.phd && f.qualifications.phd !== 'No' ? `<div style="color: #047857; font-weight: 700;"><i class="fa-solid fa-graduation-cap"></i> Ph.D: ${f.qualifications.phd}</div>` : ''}
                ${f.qualifications.netSet && f.qualifications.netSet !== 'No' ? `<div style="color: #1D4ED8; font-weight: 700;"><i class="fa-solid fa-award"></i> ${f.qualifications.netSet}</div>` : '<span style="color: #94A3B8;">-</span>'}
              </td>
              <td style="font-weight: 600; color: #0A1E3F; font-size: 0.85rem; min-width: 110px;">
                <div>${f.experience}</div>
                ${f.recognizedExp ? `<div style="font-size: 0.725rem; color: #64748B; font-weight: 400;">${f.recognizedExp}</div>` : ''}
              </td>
              <td style="font-size: 0.825rem; min-width: 110px;">
                <div><strong>Joined:</strong> ${f.joiningDate}</div>
                <div style="font-size: 0.725rem; color: #64748B;">Appt: ${f.initialAppt}</div>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  // Course Switchers
  courseTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      courseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCourse = tab.getAttribute('data-course') || 'bed';
      selectedCategory = 'all';
      selectedSubject = 'all';
      if (categoryFilter) categoryFilter.value = 'all';
      populateSubjectFilter();
      updateCertBanner();
      renderFaculty();
    });
  });

  // Filter Listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderFaculty();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      selectedCategory = e.target.value;
      renderFaculty();
    });
  }

  if (subjectFilter) {
    subjectFilter.addEventListener('change', (e) => {
      selectedSubject = e.target.value;
      renderFaculty();
    });
  }

  // Export CSV function for Faculty
  window.exportFacultyCSV = function() {
    const list = filterFaculty();
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Serial No,Name,DOB,Age,Category,Designation,Subject,B.Ed Marks,M.Ed Marks,M.A. Education,Master Degree,Ph.D,NET/SET,Teaching Experience,Date of Initial Appointment,Joining Date\n";
    list.forEach(f => {
      csvContent += `${f.slNo},"${f.name}","${f.dob}","${f.age}","${f.category}","${f.designation}","${f.subject}","${f.qualifications.bEd || 'No'}","${f.qualifications.mEd || 'No'}","${f.qualifications.maEd || 'No'}","${f.qualifications.masterSubject || 'No'}","${f.qualifications.phd || 'No'}","${f.qualifications.netSet || 'No'}","${f.experience}","${f.initialAppt}","${f.joiningDate}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SVCE_${currentCourse.toUpperCase()}_Faculty_Roster.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Initial load
  populateSubjectFilter();
  updateCertBanner();
  renderFaculty();
}

/* ==========================================================================
   Tabs Switcher Logic (Mandatory Disclosures & Academics)
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      const container = btn.closest('.tabs-container') || document;
      
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = container.querySelector(`#${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}
