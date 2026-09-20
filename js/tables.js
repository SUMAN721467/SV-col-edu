/**
 * Swami Vivekananda College of Education - Tables & Data Rendering Script
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
    link.setAttribute("download", "SVCE_BEd_Admitted_Students_2025_27.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}

/* ==========================================================================
   Faculty Listings & Roster Rendering
   ========================================================================== */
function initFacultyListings() {
  const facultyGrid = document.getElementById('faculty-cards-grid');
  const facultyTableBody = document.getElementById('faculty-table-body');
  
  if (!window.SVCE_DATA || !window.SVCE_DATA.faculty) return;
  const facultyList = window.SVCE_DATA.faculty;

  // Render Faculty Cards
  if (facultyGrid) {
    facultyGrid.innerHTML = facultyList.map(f => `
      <div class="faculty-card">
        <div class="faculty-card-header">
          <div class="faculty-avatar">
            <i class="fa-solid ${f.avatar}"></i>
          </div>
          <div class="faculty-meta">
            <h3>${f.name}</h3>
            <span class="faculty-badge">${f.designation} (${f.type})</span>
            <div style="font-size: 0.75rem; color: #64748B; margin-top: 0.2rem;">${f.subject}</div>
          </div>
        </div>
        <div class="faculty-card-body">
          <div class="faculty-detail-row">
            <strong>Qualifications:</strong>
            <span>${f.qualifications.maMSc} ${f.qualifications.mEd !== 'No' ? ' | M.Ed: ' + f.qualifications.mEd : ''} | B.Ed: ${f.qualifications.bEd}</span>
          </div>
          <div class="faculty-detail-row">
            <strong>Experience:</strong>
            <span>${f.experience}</span>
          </div>
          <div class="faculty-detail-row">
            <strong>Date of Joining:</strong>
            <span>${f.joiningDate} (Category: ${f.category})</span>
          </div>
          <p style="font-size: 0.85rem; color: #64748B; margin-top: 0.75rem; font-style: italic; border-top: 1px dashed #E2E8F0; padding-top: 0.75rem;">
            "${f.bio}"
          </p>
        </div>
      </div>
    `).join('');
  }

  // Render Detailed NCTE Format Particulars Table
  if (facultyTableBody) {
    facultyTableBody.innerHTML = facultyList.map(f => `
      <tr>
        <td style="font-weight: 700; color: #0A1E3F;">${f.slNo}</td>
        <td style="font-weight: 700; color: #0A1E3F;">
          ${f.name}
          <div style="font-size: 0.75rem; color: #64748B; font-weight: 400;">DOB: ${f.dob} (${f.age} yrs)</div>
        </td>
        <td><span class="table-badge badge-${f.category.toLowerCase().replace('-', '')}">${f.category}</span></td>
        <td><strong style="color: #0A1E3F;">${f.designation}</strong> (${f.type})</td>
        <td><span style="color: #0369A1; font-weight: 600;">${f.subject}</span></td>
        <td style="font-size: 0.825rem;">
          <div><strong>Master:</strong> ${f.qualifications.maMSc}</div>
          <div><strong>B.Ed:</strong> ${f.qualifications.bEd}</div>
          ${f.qualifications.mEd !== 'No' ? `<div><strong>M.Ed:</strong> ${f.qualifications.mEd}</div>` : ''}
        </td>
        <td style="font-weight: 600; color: #0A1E3F;">${f.experience}</td>
        <td style="font-size: 0.85rem;">${f.joiningDate}</td>
      </tr>
    `).join('');
  }
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
