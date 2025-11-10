// Profile Management
const profileStore = {
    getProfile() {
        return JSON.parse(localStorage.getItem('userProfile')) || {
            name: 'Student Name',
            role: 'Student',
            rollNo: 'ABC123',
            branch: 'Computer Science',
            semester: '5th',
            section: 'A',
            email: 'student@example.com',
            contact: '9876543210',
            parent: 'Parent Name',
            parentContact: '9876543211',
            photo: 'https://ui-avatars.com/api/?name=User&background=random',
            attendance: 95,
            subjects: 6,
            performance: 'Good'
        };
    },
    
    saveProfile(profile) {
        localStorage.setItem('userProfile', JSON.stringify(profile));
        this.updateUI(profile);
    },
    
    updateUI(profile) {
        // Update profile photo and basic info
        document.getElementById('profilePhoto').src = profile.photo;
        document.getElementById('profileName').textContent = profile.name;
        document.getElementById('profileRole').textContent = profile.role;
        
        // Update statistics
        document.getElementById('profileAttendance').textContent = profile.attendance + '%';
        document.getElementById('profileSubjects').textContent = profile.subjects;
        document.getElementById('profilePerformance').textContent = profile.performance;
        
        // Update personal information
        document.getElementById('profileRoll').textContent = profile.rollNo;
        document.getElementById('profileBranch').textContent = profile.branch;
        document.getElementById('profileSemester').textContent = profile.semester;
        document.getElementById('profileSection').textContent = profile.section;
        
        // Update contact information
        document.getElementById('profileEmail').textContent = profile.email;
        document.getElementById('profileContact').textContent = profile.contact;
        document.getElementById('profileParent').textContent = profile.parent;
        document.getElementById('profileParentContact').textContent = profile.parentContact;
        
        // Update attendance chart
        this.updateAttendanceChart();
    },
    
    updateAttendanceChart() {
        const ctx = document.getElementById('attendanceChart').getContext('2d');
        const attendanceData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Attendance %',
                data: [95, 92, 88, 95, 91, 93],
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
                tension: 0.4,
                fill: false
            }]
        };
        
        if (window.attendanceChart instanceof Chart) {
            window.attendanceChart.destroy();
        }
        
        window.attendanceChart = new Chart(ctx, {
            type: 'line',
            data: attendanceData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
};

// Initialize profile when page loads
document.addEventListener('DOMContentLoaded', () => {
    const profile = profileStore.getProfile();
    profileStore.updateUI(profile);
    
    // Handle profile photo change
    document.getElementById('changePhotoBtn').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const profile = profileStore.getProfile();
                    profile.photo = event.target.result;
                    profileStore.saveProfile(profile);
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });
    
    // Handle edit profile
    document.getElementById('editProfileBtn').addEventListener('click', () => {
        const profile = profileStore.getProfile();
        showEditProfileModal(profile);
    });
});

function showEditProfileModal(profile) {
    const modalHtml = `
        <div class="modal-backdrop"></div>
        <div class="modal edit-profile-modal modal-fade-in">
            <div class="modal-header">
                <h2><i class="fas fa-user-edit"></i> Edit Profile</h2>
                <button class="close-btn" onclick="closeModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="editProfileForm">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value="${profile.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value="${profile.email}" required>
                    </div>
                    <div class="form-group">
                        <label>Contact</label>
                        <input type="tel" name="contact" value="${profile.contact}" required>
                    </div>
                    <div class="form-group">
                        <label>Parent Name</label>
                        <input type="text" name="parent" value="${profile.parent}">
                    </div>
                    <div class="form-group">
                        <label>Parent Contact</label>
                        <input type="tel" name="parentContact" value="${profile.parentContact}">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-muted" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="saveProfileChanges()">Save Changes</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function saveProfileChanges() {
    const form = document.getElementById('editProfileForm');
    const profile = profileStore.getProfile();
    
    const formData = new FormData(form);
    formData.forEach((value, key) => {
        profile[key] = value;
    });
    
    profileStore.saveProfile(profile);
    closeModal();
    showToast('Profile updated successfully!');
}

// Configuration Constants
const AKTU_SUBJECTS = {
    1: [
        "Engineering Mathematics-I",
        "Engineering Physics-I",
        "Engineering Chemistry",
        "Professional Communication",
        "Basic Electrical Engineering",
        "Engineering Graphics & Design"
    ],
    2: [
        "Engineering Mathematics-II",
        "Engineering Physics-II",
        "Programming for Problem Solving",
        "Basic Mechanical Engineering",
        "Workshop/Manufacturing Practices",
        "Environmental Science"
    ],
    3: [
        "Mathematics-III",
        "Data Structures",
        "Digital Electronics",
        "Object Oriented Programming",
        "Computer Organization & Architecture",
        "Universal Human Values & Ethics"
    ],
    4: [
        "Mathematics-IV",
        "Discrete Structures & Theory of Logic",
        "Database Management Systems",
        "Operating Systems",
        "Theory of Computation",
        "Python Programming"
    ],
    5: [
        "Design & Analysis of Algorithms",
        "Compiler Design",
        "Software Engineering",
        "Information Security",
        "Computer Networks",
        "Web Technology"
    ],
    6: [
        "Machine Learning",
        "Artificial Intelligence",
        "Cloud Computing",
        "Data Mining & Business Intelligence",
        "Internet of Things",
        "Mobile Application Development"
    ],
    7: [
        "Big Data Analytics",
        "Natural Language Processing",
        "Deep Learning",
        "Distributed Systems",
        "Project Phase-I",
        "Open Source Technology"
    ],
    8: [
        "Project Phase-II",
        "Industrial Training",
        "Grand Viva",
        "Machine Learning Operations",
        "Blockchain Technology",
        "Quantum Computing"
    ]
};

let SUBJECTS = AKTU_SUBJECTS[3]; // Default to 3rd semester
const CLASSES = ["CSIT 2","CSE 1","IT1","S12","CS-HINDI"];
const PROFILE_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2Krpr7sdfhw-wzGqR_mRcYrvm_Jy8Jgr-A&s";

// GSAP Configuration
gsap.config({force3D: true});

// DOM Elements
const studentLogin = document.getElementById("studentLogin");
const teacherLogin = document.getElementById("teacherLogin");
const profileCard = document.getElementById("profileCard");
const cardsGrid = document.getElementById("cardsGrid");
const marksArea = document.getElementById("marksArea");
const marksGrid = document.getElementById("marksGrid");
const splashScreen = document.querySelector(".splash-screen");
const sidebar = document.querySelector(".sidebar");
const toastContainer = document.querySelector(".toast-container");

// Login Form Elements
const studentIdInput = document.getElementById("studentIdInput");
const studentPassInput = document.getElementById("studentPassInput");
const studentLoginBtn = document.getElementById("studentLoginBtn");
const teacherIdInput = document.getElementById("teacherIdInput");
const teacherPassInput = document.getElementById("teacherPassInput");
const teacherLoginBtn = document.getElementById("teacherLoginBtn");
const goTeacher = document.getElementById("goTeacher");
const goStudent = document.getElementById("goStudent");

// Enhance Login Form Validation
function setupLoginValidation() {
    // Student Login Validation
    studentIdInput?.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length === 7 && /^\d+$/.test(value)) {
            e.target.style.borderColor = 'var(--success)';
        } else {
            e.target.style.borderColor = value ? 'var(--danger)' : 'transparent';
        }
    });

    studentPassInput?.addEventListener('input', (e) => {
        const value = e.target.value;
        e.target.style.borderColor = value ? 'var(--success)' : 'transparent';
    });

    studentLoginBtn?.addEventListener('click', async (e) => {
        e.preventDefault();
        const btn = e.target;
        const originalText = btn.textContent;
        
        // Show loading state
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Logging in...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (studentPassInput.value === '123') {
                showToast('Login successful!', 'success');
                studentLogin.style.display = 'none';
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });

    // Teacher Login Validation (similar pattern)
    teacherIdInput?.addEventListener('input', (e) => {
        const value = e.target.value;
        e.target.style.borderColor = value ? 'var(--success)' : 'transparent';
    });

    teacherPassInput?.addEventListener('input', (e) => {
        const value = e.target.value;
        e.target.style.borderColor = value ? 'var(--success)' : 'transparent';
    });

    teacherLoginBtn?.addEventListener('click', async (e) => {
        e.preventDefault();
        const btn = e.target;
        const originalText = btn.textContent;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Logging in...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (teacherPassInput.value === 'admin') {
                showToast('Welcome back, Teacher!', 'success');
                teacherLogin.style.display = 'none';
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Show login screen by default
    if (studentLogin) studentLogin.style.display = 'flex';
    if (teacherLogin) teacherLogin.style.display = 'none';
    if (splashScreen) splashScreen.style.display = 'none';

    // Initialize components
    initializeApp();
    initializeCharts();
    initializeNoticeBoard();
    setupEventListeners();
    setupLoginValidation();

    // Handle login form switching
    goTeacher?.addEventListener('click', () => {
        studentLogin.style.display = 'none';
        teacherLogin.style.display = 'flex';
    });

    goStudent?.addEventListener('click', () => {
        teacherLogin.style.display = 'none';
        studentLogin.style.display = 'flex';
    });

  // Dashboard tasks: render saved tasks and wire add button for teacher view
  function _loadDashboardTasks(){ try{ return JSON.parse(localStorage.getItem('dashboardTasks')||'[]'); }catch(e){ return []; } }
  function _saveDashboardTasks(list){ try{ localStorage.setItem('dashboardTasks', JSON.stringify(list)); }catch(e){} }
  function renderDashboardTasks(){
    const container = document.querySelector('.tasks-card .task-list');
    if(!container) return;
    const tasks = _loadDashboardTasks();
    if(tasks.length===0){
      container.innerHTML = '<div class="muted">No upcoming tasks. Add one with the + button.</div>';
      return;
    }
    let html = '';
    tasks.forEach(t=>{
      html += `<div class="task-item" data-id="${t.id}">
            <div class="task-header">
              <span class="task-subject">${t.subject||''}</span>
              <span class="task-due">${t.due||''}</span>
            </div>
            <div class="task-title">${t.title}</div>
            <div class="task-actions" style="margin-top:8px;display:flex;gap:8px">
              <button class="btn btn-muted edit-dashboard-task">Edit</button>
              <button class="btn btn-danger delete-dashboard-task">Delete</button>
            </div>
            </div>`;
    });
    container.innerHTML = html;
        // wire buttons: edit -> open modal, delete -> confirm then remove
        container.querySelectorAll('.edit-dashboard-task').forEach(b=> b.onclick = (e)=>{
            const id = e.target.closest('.task-item').dataset.id;
            const tasks = _loadDashboardTasks(); const idx = tasks.findIndex(x=>x.id===id); if(idx===-1) return;
            const t = tasks[idx];
            // build edit modal
            if(document.getElementById('editTaskModal')) return;
            const editHtml = `
              <div class="modal-overlay" id="editTaskModal">
                <div class="modal-content" style="max-width:520px">
                  <div class="modal-header"><h2 class="modal-title">Edit Task</h2><button class="close-button" id="closeEditTaskModal"><i class="fas fa-times"></i></button></div>
                  <div class="modal-body">
                    <div style="display:flex;flex-direction:column;gap:8px">
                      <input id="editTaskSubject" placeholder="Subject (optional)" value="${(t.subject||'').replace(/"/g,'&quot;')}" />
                      <input id="editTaskTitle" placeholder="Task title (required)" value="${(t.title||'').replace(/"/g,'&quot;')}" />
                      <input id="editTaskDue" placeholder="Due (optional)" value="${(t.due||'').replace(/"/g,'&quot;')}" />
                    </div>
                  </div>
                  <div class="modal-footer" style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
                    <button class="btn btn-muted" id="cancelEditTask">Cancel</button>
                    <button class="btn btn-primary" id="saveEditTask">Save Changes</button>
                  </div>
                </div>
              </div>
            `;
            document.body.insertAdjacentHTML('beforeend', editHtml);
            document.getElementById('closeEditTaskModal').onclick = () => document.getElementById('editTaskModal').remove();
            document.getElementById('cancelEditTask').onclick = () => document.getElementById('editTaskModal').remove();
            document.getElementById('saveEditTask').onclick = ()=>{
              const subject = document.getElementById('editTaskSubject').value || '';
              const title = (document.getElementById('editTaskTitle').value||'').trim();
              const due = document.getElementById('editTaskDue').value || '';
              if(!title){ showToast('Task title required', 'error'); return; }
              tasks[idx] = Object.assign({}, t, { subject: subject.trim(), title: title, due: due.trim() });
              _saveDashboardTasks(tasks);
              renderDashboardTasks();
              showToast('Task updated', 'success');
              document.getElementById('editTaskModal').remove();
            };
        });
        container.querySelectorAll('.delete-dashboard-task').forEach(b=> b.onclick = (e)=>{
            const id = e.target.closest('.task-item').dataset.id;
            if(!confirm('Delete this task?')) return;
            let tasks = _loadDashboardTasks(); tasks = tasks.filter(x=> x.id !== id); _saveDashboardTasks(tasks); renderDashboardTasks(); showToast('Task deleted', 'info');
        });
  }

  // wire add button (shows prompts for quick add)
  const addBtn = document.getElementById('addDashboardTaskBtn');
  if(addBtn){
    // open modal form for adding a dashboard task
    function openAddDashboardTaskModal(){
      // avoid duplicate modal
      if(document.getElementById('addTaskModal')) return;
      const modalHtml = `
        <div class="modal-overlay" id="addTaskModal">
          <div class="modal-content" style="max-width:520px">
            <div class="modal-header"><h2 class="modal-title">Add Dashboard Task</h2><button class="close-button" id="closeAddTaskModal"><i class="fas fa-times"></i></button></div>
            <div class="modal-body">
              <div style="display:flex;flex-direction:column;gap:8px">
                <input id="addTaskSubject" placeholder="Subject (optional)" />
                <input id="addTaskTitle" placeholder="Task title (required)" />
                <input id="addTaskDue" placeholder="Due (optional)" />
              </div>
            </div>
            <div class="modal-footer" style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
              <button class="btn btn-muted" id="cancelAddTask">Cancel</button>
              <button class="btn btn-primary" id="saveAddTask">Save Task</button>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      document.getElementById('closeAddTaskModal').onclick = () => document.getElementById('addTaskModal').remove();
      document.getElementById('cancelAddTask').onclick = () => document.getElementById('addTaskModal').remove();
      document.getElementById('saveAddTask').onclick = ()=>{
        const subject = document.getElementById('addTaskSubject').value || '';
        const title = (document.getElementById('addTaskTitle').value||'').trim();
        const due = document.getElementById('addTaskDue').value || '';
        if(!title){ showToast('Task title required', 'error'); return; }
        const tasks = _loadDashboardTasks();
        tasks.unshift({ id: Date.now().toString(), subject: subject.trim(), title: title, due: due.trim() });
        _saveDashboardTasks(tasks);
        renderDashboardTasks();
        showToast('Task added', 'success');
        document.getElementById('addTaskModal').remove();
      };
    }

    addBtn.onclick = openAddDashboardTaskModal;
    // delegated click so it works even if DOM changes
    document.addEventListener('click', (e)=>{ if(e.target.closest && e.target.closest('#addDashboardTaskBtn')) openAddDashboardTaskModal(); });
  }
  // initial render
  renderDashboardTasks();
});

// Initialize Dashboard Charts
function initializeCharts() {
    // Attendance Pie Chart
    const attendanceChart = document.getElementById('attendanceChart');
    if (attendanceChart) {
        new Chart(attendanceChart, {
            type: 'pie',
            data: {
                labels: ['Present', 'Absent'],
                datasets: [{
                    data: [75, 25], // 75% attendance
                    backgroundColor: ['#43e97b', '#ed6c63'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            color: 'var(--text)'
                        }
                    }
                }
            }
        });
    }

    // Grades Line Chart
    const gradesChart = document.getElementById('gradesChart');
    if (gradesChart) {
        new Chart(gradesChart, {
            type: 'line',
            data: {
                labels: SUBJECTS,
                datasets: [{
                    label: 'Internal',
                    data: [85, 78, 92, 88, 95, 82],
                    borderColor: '#6366f1',
                    backgroundColor: '#6366f1',
                    tension: 0.4
                }, {
                    label: 'Final',
                    data: [88, 82, 90, 85, 92, 87],
                    borderColor: '#22d3ee',
                    backgroundColor: '#22d3ee',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: 'var(--text)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'var(--text)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 20,
                            color: 'var(--text)'
                        }
                    }
                }
            }
        });
    }
}

// Loading Screen Animation
function initializeApp() {
    gsap.to(splashScreen, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        onComplete: () => {
            splashScreen.style.display = 'none';
            showToast('Welcome to Student Portal', 'info');
        }
    });
}
const profilePhoto = document.getElementById("profilePhoto");
const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");
const rightPill = document.getElementById("rightPill");

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => toast.classList.add('show'));
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modal elements
const marksModal = document.getElementById("marksModal");
const modalSubject = document.getElementById("modalSubject");
const mInternal = document.getElementById("mInternal");
const mMid = document.getElementById("mMid");
const mFinal = document.getElementById("mFinal");
const mTotal = document.getElementById("mTotal");
document.getElementById("closeModal").onclick=()=>marksModal.style.display="none";

// Switch between login forms
document.getElementById("goTeacher").onclick=()=>{
  studentLogin.style.display="none";
  teacherLogin.style.display="flex";
};
document.getElementById("goStudent").onclick=()=>{
  teacherLogin.style.display="none";
  studentLogin.style.display="flex";
};

// Login handlers
document.getElementById("studentLoginBtn").onclick = () => {
  const id = document.getElementById("studentIdInput").value;
  const pass = document.getElementById("studentPassInput").value;
  if(id.length===7 && pass==="123"){
    studentLogin.style.display="none";
    const studentData = {
      id: id,
      name: "Vivek Kumar",
      rollNo: "2100290120001",
      branch: "Computer Science & Engineering",
      semester: 3,
      section: "CS-A",
      cgpa: 8.5,
      attendance: 85,
      assignments: [
        { subject: "Data Structures", title: "Binary Trees", due: "Tomorrow", progress: 75 },
        { subject: "Python", title: "File Handling", due: "2 days", progress: 40 },
        { subject: "DSTL", title: "Graph Theory", due: "Next week", progress: 20 }
      ]
    };
    renderStudent(studentData);
  } else alert("Invalid Student credentials");
};

document.getElementById("teacherLoginBtn").onclick = () => {
  const id = document.getElementById("teacherIdInput").value;
  const pass = document.getElementById("teacherPassInput").value;
  if(id.length===7 && pass==="123"){
    teacherLogin.style.display="none";
    const teacherData = {
      id: id,
      name: "Dr. Rajesh Kumar",
      designation: "Associate Professor",
      department: "Computer Science & Engineering",
      subjects: ["Data Structures", "Python Programming", "Theory of Computation"],
      classes: ["CS-A", "CS-B", "CS-C"],
      totalStudents: 180
    };
    renderTeacher(teacherData);
  } else alert("Invalid Teacher credentials");
};

// Render dashboards
function renderStudent(id, name) {
  profileCard.style.display = "flex";
  cardsGrid.style.display = "grid";
  marksArea.style.display = "block";
  profilePhoto.src = PROFILE_IMG;
  profileName.textContent = name;
  profileRole.textContent = "Student";

  // Add semester dropdown if not present
  if (!document.getElementById('semesterSelect')) {
    const select = document.createElement('select');
    select.id = 'semesterSelect';
    select.className = 'pill';
    for (let i = 1; i <= 8; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `Semester ${i}`;
      select.appendChild(opt);
    }
    select.value = '3';
    select.onchange = () => updateSemester(select.value);
    rightPill.innerHTML = '';
    rightPill.appendChild(select);
  }

  updateSemester(document.getElementById('semesterSelect').value);
}

function updateSemester(sem) {
  SUBJECTS = AKTU_SUBJECTS[sem] || AKTU_SUBJECTS[3]; // Fallback to 3rd semester if invalid
  
  // Update subject cards
  cardsGrid.innerHTML = "";
  SUBJECTS.forEach(s => {
    const card = document.createElement("div");
    card.className = "card";
    // Add subject code if available
    const subjectDisplay = s.includes('-') ? s : s;
    card.innerHTML = `
      <h3>${subjectDisplay}</h3>
      <div class="big">${Math.floor(Math.random() * 21) + 80}%</div>
    `;
    card.onclick = () => showAttendance(s);
    cardsGrid.appendChild(card);
  });

  // Update marks grid
  marksGrid.innerHTML = "";
  SUBJECTS.forEach(s => {
    const m = document.createElement("div");
    m.className = "card small";
    m.innerHTML = `
      <h3>${s}</h3>
      <div class="muted">Click to view marks</div>
    `;
    m.onclick = () => showMarks(s);
    marksGrid.appendChild(m);
  });
}

// Attendance modal logic
const attendanceModal = document.getElementById('attendanceModal');
const attendanceSubject = document.getElementById('attendanceSubject');
const attendanceTable = document.getElementById('attendanceTable');
const attendancePie = document.getElementById('attendancePie');
const closeAttendance = document.getElementById('closeAttendance');
if (closeAttendance) closeAttendance.onclick = () => attendanceModal.style.display = 'none';

function showAttendance(subject) {
  // Generate random attendance for last 7 days
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const attendance = days.map(() => Math.random() > 0.2 ? 'Present' : 'Absent');
  attendanceSubject.textContent = subject + ' - Attendance (Last 7 Days)';
  // Table
  attendanceTable.innerHTML = `<table style="width:100%;margin-top:12px"><tr>${days.map(d=>`<th>${d}</th>`).join('')}</tr><tr>${attendance.map(a=>`<td style='color:${a==="Present"?"#43e97b":"#ed6c63"}'>${a}</td>`).join('')}</tr></table>`;
  // Pie chart data
  const present = attendance.filter(a=>a==="Present").length;
  const absent = attendance.length - present;
  // Pie chart
  if (window.attendancePieChart) window.attendancePieChart.destroy();
  window.attendancePieChart = new Chart(attendancePie, {
    type: 'pie',
    data: {
      labels: ['Present','Absent'],
      datasets: [{
        data: [present, absent],
        backgroundColor: ['#43e97b','#ed6c63'],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: { display: true, position: 'bottom' }
      }
    }
  });
  attendanceModal.style.display = 'flex';
}
function renderTeacher(id,name){
  profileCard.style.display="flex";
  cardsGrid.style.display="grid";
  marksArea.style.display="none";
  profilePhoto.src=PROFILE_IMG;
  profileName.textContent=name;
  profileRole.textContent="Teacher";
  rightPill.textContent="Faculty";
  cardsGrid.innerHTML="";
  CLASSES.forEach(c=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`<h3>${c}</h3><div class="big">${Math.floor(Math.random()*21)+75}%</div><div class="card-tools" style="margin-top:10px;display:flex;gap:8px"><button class="btn btn-muted small" data-class="${c}" data-action="students">Students</button><button class="btn btn-muted small" data-class="${c}" data-action="records">Records</button><button class="btn btn-muted small" data-class="${c}" data-action="analytics">Analytics</button></div>`;
    // When teacher clicks a class card tools
    card.querySelectorAll('.card-tools button').forEach(b=> b.onclick = (e)=>{
      const action = e.target.dataset.action; const cls = e.target.dataset.class;
      if(action === 'students') showClassStudents(cls);
      if(action === 'records') showAttendanceRecords(cls);
      if(action === 'analytics') showAttendanceAnalytics(cls);
    });
    cardsGrid.appendChild(card);
  });
  // render alerts for low attendance after cards
  renderLowAttendanceAlerts();
}

// Marks modal
function showMarks(subject){
  const internal=Math.floor(Math.random()*11)+15;
  const mid=Math.floor(Math.random()*21)+20;
  const final=Math.floor(Math.random()*41)+40;
  const total=internal+mid+final;
  modalSubject.textContent=subject;
  mInternal.textContent=internal;
  mMid.textContent=mid;
  mFinal.textContent=final;
  mTotal.textContent=total;
  marksModal.style.display="flex";
}

// Students modal (for teacher view): populate with sample students
function showClassStudents(className) {
  // create sample students for the clicked class (in real app this would be fetched)
  const students = Array.from({length: 60}).map((_,i)=>{
    return {
      roll: `${className.substring(0,2).toUpperCase()}-${100+i}`,
      name: `Student ${i+1}`,
      grade: ['A','B+','B','A-'][Math.floor(Math.random()*4)]
    };
  });

  const container = document.getElementById('studentsContainer');
  if (!container) return;

  // helper: attendance store in localStorage keyed by className
  function _getStore(){
    try{ return JSON.parse(localStorage.getItem('attendanceStore')||'{}'); }catch(e){ return {}; }
  }
  function _saveStore(s){ localStorage.setItem('attendanceStore', JSON.stringify(s)); }
  function loadAttendanceFor(dateStr){ const store=_getStore(); return (store[className] && store[className][dateStr]) ? store[className][dateStr] : null; }
  function saveAttendanceFor(dateStr, data){ const store=_getStore(); store[className] = store[className]||{}; store[className][dateStr]=data; _saveStore(store); }

  // compute attendance% for a list of students using stored history
  function computeAttendancePercentages(studentList){
    const store = _getStore();
    const classStore = store[className] || {};
    const dates = Object.keys(classStore);
    const totalDays = dates.length;
    const presentCounts = {};
    if(totalDays>0){
      dates.forEach(d => {
        const day = classStore[d] || {};
        Object.keys(day).forEach(r => { if(day[r]) presentCounts[r] = (presentCounts[r]||0)+1; });
      });
    }
    return studentList.map(s => {
      const present = presentCounts[s.roll] || 0;
      const pct = totalDays>0 ? Math.round((present/totalDays)*100) : Math.floor(Math.random()*11)+85; // fallback random if no history
      return Object.assign({}, s, { attendance: pct });
    });
  }

  // State for pagination/sorting/filter
  let allStudents = computeAttendancePercentages(students);
  let filteredStudents = [...allStudents];
  let sortKey = 'name';
  let sortDir = 'asc';
  let pageSize = 12;
  let currentPage = 1;

  const today = new Date().toISOString().slice(0,10);

  const controlsHtml = `
    <div class="students-controls">
      <div class="controls-left">
        <label for="attendanceDate" class="control-label">Date:</label>
        <input id="attendanceDate" class="control-input" type="date" value="${today}" />
        <button id="loadAttendanceBtn" class="btn btn-muted">Load</button>
        <input id="studentSearch" class="student-search" placeholder="Search name or roll" />
      </div>
      <div class="controls-right">
        <label for="sortSelect" class="control-label">Sort:</label>
        <select id="sortSelect" class="control-input">
          <option value="name">Name</option>
          <option value="roll">Roll</option>
          <option value="attendance">Attendance%</option>
        </select>
        <button id="sortDirBtn" class="btn btn-muted">↑</button>
        <input id="importCsvInput" type="file" accept=".csv" style="display:none" />
        <button id="importCsvBtn" class="btn btn-muted">Import CSV</button>
        <button id="markAllBtn" class="btn btn-primary">Mark All Present</button>
        <button id="markNoneBtn" class="btn btn-danger">Mark All Absent</button>
        <button id="exportCsvBtn" class="btn btn-muted">Export CSV</button>
        <button id="saveAttendanceBtn" class="btn btn-save">Save Attendance</button>
      </div>
    </div>
    <div style="height:12px"></div>
  `;

  // Create table skeleton
  const table = document.createElement('table');
  table.className = 'students-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th class="col-roll">Roll</th>
        <th class="col-name">Name</th>
        <th class="col-att">Attendance%</th>
        <th class="col-today">Today</th>
        <th class="col-notes">Notes</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  container.innerHTML = controlsHtml;
  container.appendChild(table);

  // helpers for rendering
  const dateInput = document.getElementById('attendanceDate');
  const loadBtn = document.getElementById('loadAttendanceBtn');
  const saveBtn = document.getElementById('saveAttendanceBtn');
  const searchInput = document.getElementById('studentSearch');
  const sortSelect = document.getElementById('sortSelect');
  const sortDirBtn = document.getElementById('sortDirBtn');
  const markAllBtn = document.getElementById('markAllBtn');
  const markNoneBtn = document.getElementById('markNoneBtn');
  const exportBtn = document.getElementById('exportCsvBtn');
  const tbody = table.querySelector('tbody');

  function applyFiltersAndSort(){
    const q = (searchInput.value||'').trim().toLowerCase();
    filteredStudents = allStudents.filter(s => {
      if(!q) return true;
      return (s.name+' '+s.roll).toLowerCase().includes(q);
    });
    // sort
    filteredStudents.sort((a,b)=>{
      let A = a[sortKey]; let B = b[sortKey];
      if(sortKey==='name') { A = A.toLowerCase(); B = B.toLowerCase(); }
      if(A < B) return sortDir==='asc' ? -1 : 1;
      if(A > B) return sortDir==='asc' ? 1 : -1;
      return 0;
    });
    // clamp page
    const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
    if(currentPage > totalPages) currentPage = totalPages;
  }

  function renderTable(){
    applyFiltersAndSort();
    tbody.innerHTML = '';
    const start = (currentPage-1)*pageSize;
    const pageRows = filteredStudents.slice(start, start+pageSize);
    const loaded = loadAttendanceFor(dateInput.value) || {};
    pageRows.forEach(s => {
      const tr = document.createElement('tr');
      tr.dataset.roll = s.roll;
      // normalize loaded value (support legacy boolean true/false)
      const loadedVal = (loaded[s.roll] === true) ? 'present' : (loaded[s.roll] === false ? 'absent' : (loaded[s.roll] || 'absent'));
      tr.innerHTML = `
        <td class="td-roll">${s.roll}</td>
        <td class="td-name" style="color:#000000"><a href="#" class="student-link" data-roll="${s.roll}" style="color:#000000">${s.name}</a></td>
        <td class="td-att" style="text-align:right">${s.attendance}%</td>
        <td class="td-today" style="text-align:center">
          <select class="today-status" data-roll="${s.roll}" style="color:#000000">
            <option value="present" ${loadedVal==='present'?'selected':''}>Present</option>
            <option value="absent" ${loadedVal==='absent'?'selected':''}>Absent</option>
            <option value="late" ${loadedVal==='late'?'selected':''}>Late</option>
          </select>
        </td>
        <td class="td-notes" style="text-align:left"><input type="text" class="note-input" data-roll="${s.roll}" placeholder="Add note" value="${(getNote && getNote(s.roll)) || ''}" /></td>
      `;
      tbody.appendChild(tr);
    });

    // pagination footer
    const footerRow = document.createElement('tr');
    footerRow.className = 'pagination-row';
    const td = document.createElement('td'); td.colSpan = 4;
    const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
    td.innerHTML = `
      <div class="pagination-controls">
        <button id="prevPage" class="btn btn-muted">Prev</button>
        <span class="page-info">Page ${currentPage} / ${totalPages} — ${filteredStudents.length} students</span>
        <button id="nextPage" class="btn btn-muted">Next</button>
      </div>
    `;
    footerRow.appendChild(td);
    tbody.appendChild(footerRow);

    // wire pagination buttons
    document.getElementById('prevPage').onclick = ()=>{ if(currentPage>1){ currentPage--; renderTable(); } };
    document.getElementById('nextPage').onclick = ()=>{ if(currentPage<totalPages){ currentPage++; renderTable(); } };
  }

  // initial render
  renderTable();

  // apply initial loaded attendance for the selected date
  function applyLoaded(dateStr){
    const loaded = loadAttendanceFor(dateStr) || {};
    tbody.querySelectorAll('.today-status').forEach(sel=>{
      const roll = sel.dataset.roll;
      const v = loaded[roll];
      if(v === true) sel.value = 'present';
      else if(v === false) sel.value = 'absent';
      else if(typeof v === 'string') sel.value = v;
      else sel.value = 'absent';
    });
    // notes
    tbody.querySelectorAll('.note-input').forEach(inp=>{ const r = inp.dataset.roll; inp.value = (getNote && getNote(r)) || ''; });
  }

  loadBtn.onclick = () => { applyLoaded(dateInput.value); };

  // search/filter
  searchInput.addEventListener('input', (e) => { currentPage = 1; renderTable(); });

  // sort
  sortSelect.onchange = () => { sortKey = sortSelect.value; renderTable(); };
  sortDirBtn.onclick = () => { sortDir = sortDir === 'asc' ? 'desc' : 'asc'; sortDirBtn.textContent = sortDir === 'asc' ? '↑' : '↓'; renderTable(); };

  // mark all / none for visible page
  markAllBtn.onclick = ()=>{ tbody.querySelectorAll('tr').forEach(r=>{ const cb = r.querySelector('.today-att'); if(cb) cb.checked = true; }); };
  markNoneBtn.onclick = ()=>{ tbody.querySelectorAll('tr').forEach(r=>{ const cb = r.querySelector('.today-att'); if(cb) cb.checked = false; }); };

  // Notes store helpers (separate key to keep notes independent)
  function _getNotesStore(){ try{ return JSON.parse(localStorage.getItem('studentNotes')||'{}'); }catch(e){ return {}; } }
  function _saveNotesStore(s){ localStorage.setItem('studentNotes', JSON.stringify(s)); }
  function getNote(roll){ const ns = _getNotesStore(); return (ns[className] && ns[className][roll]) ? ns[className][roll] : ''; }
  function setNote(roll, text){ const ns = _getNotesStore(); ns[className] = ns[className] || {}; ns[className][roll] = text; _saveNotesStore(ns); }

  // wire note inputs (delegated) — save on blur
  container.addEventListener('blur', (e) => {
    if(e.target && e.target.classList && e.target.classList.contains('note-input')){
      const roll = e.target.dataset.roll; setNote(roll, e.target.value.trim());
      showToast('Note saved', 'success');
    }
  }, true);

  // export CSV (current filtered list)
  exportBtn.onclick = () => {
    const rows = filteredStudents; // export all filtered students, not just page
    const csv = ['Roll,Name,Attendance%,Today'];
    const loaded = loadAttendanceFor(dateInput.value) || {};
    rows.forEach(r => {
      const v = loaded[r.roll];
      const todayStatus = (v === true || v === 'present') ? 'Present' : (v === 'late' ? 'Late' : 'Absent');
      csv.push([r.roll, '"'+r.name.replace(/"/g,'""')+'"', r.attendance+'%', todayStatus].join(','));
    });
    const blob = new Blob([csv.join('\n')], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${className.replace(/\s+/g,'_')}_students.csv`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    showToast('CSV exported', 'success');
  };

  // CSV import handler
  const importInput = document.getElementById('importCsvInput');
  const importBtn = document.getElementById('importCsvBtn');
  importBtn.onclick = () => importInput.click();
  importInput.onchange = (e) => {
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(l=>l);
      const headers = lines[0].split(',').map(h=>h.trim().toLowerCase());
      const rollIdx = headers.findIndex(h=>/roll/.test(h));
      const presentIdx = headers.findIndex(h=>/(present|today|status)/.test(h));
      if(rollIdx===-1 || presentIdx===-1){ showToast('CSV must include Roll and Present columns', 'error'); return; }
      const dateStr = dateInput.value;
      const imported = {};
      for(let i=1;i<lines.length;i++){
        const cols = lines[i].split(',');
        const roll = (cols[rollIdx]||'').trim();
            const val = (cols[presentIdx]||'').trim().toLowerCase();
        if(!roll) continue;
            const present = (val==='present' || val==='true' || val==='1' || val==='yes' || val==='y') ? 'present' : (val==='late' ? 'late' : 'absent');
            imported[roll] = present;
      }
      // merge with existing for date
      const existing = loadAttendanceFor(dateStr) || {};
      const merged = Object.assign({}, existing, imported);
      saveAttendanceFor(dateStr, merged);
      // re-render and apply
      allStudents = computeAttendancePercentages(students);
      renderTable();
      applyLoaded(dateStr);
      showToast('CSV imported and attendance applied for ' + dateStr, 'success');
    };
    reader.readAsText(file);
    // clear input so same file can be re-imported later
    importInput.value = '';
  };

  // save attendance for selected date and recompute attendance% for all students
  // also emit change logs for any modified rolls
  saveBtn.onclick = ()=>{
    const dateStr = dateInput.value;
    const selects = tbody.querySelectorAll('.today-status');
    const data = {};
    selects.forEach(sel=>{ data[sel.dataset.roll] = sel.value; });
    // Merge with previously hidden rows (not on current page): ensure we save full set for class
    const existing = _getStore()[className] && _getStore()[className][dateStr] ? _getStore()[className][dateStr] : {};
    const merged = Object.assign({}, existing, data);
    // create logs for differences
    const teacher = (profileName && profileName.textContent) ? profileName.textContent : 'Teacher';
    const timestamp = new Date().toISOString();
    const logs = [];
    Object.keys(merged).forEach(roll=>{
      const prev = existing[roll] === true ? 'present' : (existing[roll] === false ? 'absent' : (existing[roll] || 'absent'));
      const next = merged[roll];
      if(prev !== next){
        logs.push({ class: className, date: dateStr, roll, prev, next, teacher, timestamp });
      }
    });
    if(logs.length){
      const ls = JSON.parse(localStorage.getItem('attendanceLogs')||'[]');
      const mergedLogs = ls.concat(logs);
      localStorage.setItem('attendanceLogs', JSON.stringify(mergedLogs));
    }
    saveAttendanceFor(dateStr, merged);
    // recompute attendance% for all students
    allStudents = computeAttendancePercentages(students);
    currentPage = 1;
    renderTable();
    showToast('Attendance saved for ' + dateStr, 'success');
  };

  const modal = document.getElementById('studentsModal');
  if (!modal) return;
  const title = document.getElementById('studentsTitle');
  if (title) title.textContent = `${className} — Students`;
  modal.style.display = 'flex';
  const closeBtn = document.getElementById('closeStudents');
  // mark modal-content as modern/compact so CSS can style it
  try{ const c = modal.querySelector('.modal-content'); if(c) c.classList.add('modern','compact'); }catch(e){}
  // Auto-focus the search input for faster keyboard workflow
  setTimeout(()=>{ try{ const s = document.getElementById('studentSearch'); if(s) s.focus(); }catch(e){} }, 80);

  // Allow Escape to close the students modal
  // set ARIA attributes
  try{ modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true'); modal.setAttribute('aria-label', `${className} — Students`); }catch(e){}

  // Focus-trap: keep tab focus inside modal
  const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let focusableEls = Array.from(modal.querySelectorAll(focusableSelector)).filter(el=> el.offsetParent !== null);
  let firstFocusable = focusableEls[0] || null;
  let lastFocusable = focusableEls[focusableEls.length-1] || null;
  if(firstFocusable) firstFocusable.focus();

  const _trap = (ev)=>{ if(ev.key !== 'Tab') return; focusableEls = Array.from(modal.querySelectorAll(focusableSelector)).filter(el=> el.offsetParent !== null); firstFocusable = focusableEls[0]||firstFocusable; lastFocusable = focusableEls[focusableEls.length-1]||lastFocusable; if(focusableEls.length===0){ ev.preventDefault(); return; } if(ev.shiftKey){ if(document.activeElement === firstFocusable){ ev.preventDefault(); lastFocusable.focus(); } } else { if(document.activeElement === lastFocusable){ ev.preventDefault(); firstFocusable.focus(); } } };

  const _escHandler = (ev)=>{ if(ev.key === 'Escape'){ try{ modal.style.display = 'none'; }catch(e){} document.removeEventListener('keydown', _escHandler); document.removeEventListener('keydown', _trap); } };
  document.addEventListener('keydown', _escHandler);
  document.addEventListener('keydown', _trap);

  if (closeBtn) {
    // ensure visible glyph if icon fonts not loaded
    try{ if((closeBtn.innerText||'').trim()==='') closeBtn.innerHTML = '<span aria-hidden="true">✕</span>'; }catch(e){}
    closeBtn.onclick = () => { modal.style.display = 'none'; document.removeEventListener('keydown', _escHandler); document.removeEventListener('keydown', _trap); };
  }
}

  // ----- Attendance logs and admin helpers -----
  function _getLogs(){ try{ return JSON.parse(localStorage.getItem('attendanceLogs')||'[]'); }catch(e){ return []; } }
  function _saveLogs(logs){ localStorage.setItem('attendanceLogs', JSON.stringify(logs)); }
  function getLogsForClass(className){ return _getLogs().filter(l=>l.class===className); }

  // Show attendance records modal (date-range + edit)
  function showAttendanceRecords(className){
    const modalId = 'recordsModal';
    let modal = document.getElementById(modalId);
    if(modal) modal.remove();
    const html = `
      <div class="modal-overlay" id="${modalId}">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Attendance Records — ${className}</h2>
            <button class="close-button" id="closeRecords"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px">
              <label class="control-label">From:</label>
              <input type="date" id="recFrom" />
              <label class="control-label">To:</label>
              <input type="date" id="recTo" />
                <button id="recFilter" class="btn btn-muted">Filter</button>
                <button id="importStudentsBtn" class="btn btn-muted">Import Students</button>
                <button id="viewStudentsBtn" class="btn btn-muted">View Students</button>
                <button id="recClose" class="btn btn-save">Close</button>
            </div>
            <div id="recordsTableWrap"></div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    modal = document.getElementById(modalId);
    document.getElementById('closeRecords').onclick = ()=> modal.remove();
    document.getElementById('recClose').onclick = ()=> modal.remove();
    const wrap = document.getElementById('recordsTableWrap');
    const store = JSON.parse(localStorage.getItem('attendanceStore')||'{}');
    const classStore = store[className] || {};
    // Ensure a default students list exists for this class (60 students)
    const studentsKey = 'classStudents';
    const allStudentsStore = JSON.parse(localStorage.getItem(studentsKey)||'{}');
    if(!allStudentsStore[className]){
      const defaultStudents = Array.from({length:60}).map((_,i)=>({
        roll: `${className.substring(0,2).toUpperCase()}-${100+i}`,
        name: `Student ${i+1}`
      }));
      allStudentsStore[className] = defaultStudents;
      localStorage.setItem(studentsKey, JSON.stringify(allStudentsStore));
    }

    // Tasks container for this class inside the records modal
    const tasksWrapId = 'recordsTasksWrap';
    let tasksWrap = document.getElementById(tasksWrapId);
    if(!tasksWrap){
      const div = document.createElement('div');
      div.id = tasksWrapId;
      div.style.marginTop = '12px';
      wrap.insertAdjacentElement('beforebegin', div);
      tasksWrap = div;
    }

    // Tasks persistence helpers (per-class)
    function _loadTasks(){ try{ const t = JSON.parse(localStorage.getItem('classTasks')||'{}'); return t[className] || []; }catch(e){ return []; } }
    function _saveTasks(list){ try{ const all = JSON.parse(localStorage.getItem('classTasks')||'{}'); all[className] = list; localStorage.setItem('classTasks', JSON.stringify(all)); }catch(e){} }

    // Render tasks UI
    function renderTasks(){
      const tasks = _loadTasks();
      let html = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <h3 style="margin:0">Tasks — ${className}</h3>
          <div style="display:flex;gap:8px;align-items:center">
            <input id="newTaskInput" placeholder="Add a task..." style="padding:6px 8px;border-radius:6px;border:1px solid rgba(0,0,0,0.08)" />
            <button id="addTaskBtn" class="btn btn-primary" title="Add task">
              <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      `;
      if(tasks.length===0){
        html += '<div class="muted">No tasks yet. Add one using the + button.</div>';
      } else {
        html += '<ul class="task-list" style="list-style:none;padding:0;margin:8px 0;max-height:220px;overflow:auto">';
        tasks.forEach(t=>{
          html += `<li data-id="${t.id}" style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid rgba(0,0,0,0.04)">`+
                  `<div class="task-text" style="flex:1;margin-right:12px">${escapeHtml(t.text)}</div>`+
                  `<div style="display:flex;gap:6px">`+
                    `<button class="btn btn-muted edit-task">Edit</button>`+
                    `<button class="btn btn-danger delete-task">Delete</button>`+
                  `</div></li>`;
        });
        html += '</ul>';
      }
      tasksWrap.innerHTML = html;

      // wire add
      document.getElementById('addTaskBtn').onclick = ()=>{
        const inp = document.getElementById('newTaskInput');
        const v = (inp.value||'').trim();
        if(!v) return showToast('Enter a task', 'error');
        const tasks = _loadTasks();
        const item = { id: Date.now().toString(), text: v };
        tasks.unshift(item);
        _saveTasks(tasks);
        inp.value = '';
        renderTasks();
        showToast('Task added', 'success');
      };

      // wire edit/delete (delegated)
      tasksWrap.querySelectorAll('.edit-task').forEach(b=> b.onclick = (e)=>{
        const li = e.target.closest('li'); const id = li.dataset.id;
        const tasks = _loadTasks(); const idx = tasks.findIndex(x=>x.id===id); if(idx===-1) return;
        // replace text with inline input
        const txtDiv = li.querySelector('.task-text');
        const old = tasks[idx].text;
        txtDiv.innerHTML = `<input class="editTaskInput" value="${escapeHtml(old)}" style="width:100%;padding:6px;border-radius:6px;border:1px solid rgba(0,0,0,0.08)" />`;
        const editBtn = li.querySelector('.edit-task'); editBtn.textContent = 'Save';
        editBtn.onclick = ()=>{
          const newVal = li.querySelector('.editTaskInput').value.trim();
          if(!newVal) return showToast('Task cannot be empty', 'error');
          tasks[idx].text = newVal; _saveTasks(tasks); renderTasks(); showToast('Task updated', 'success');
        };
      });

      tasksWrap.querySelectorAll('.delete-task').forEach(b=> b.onclick = (e)=>{
        const li = e.target.closest('li'); const id = li.dataset.id;
        let tasks = _loadTasks(); tasks = tasks.filter(x=> x.id !== id); _saveTasks(tasks); renderTasks(); showToast('Task deleted', 'info');
      });
    }

    // small helper to escape HTML when injecting task text
    function escapeHtml(str){ return String(str).replace(/[&<>\"]+/g, (s)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[s])); }

    function renderRecords(from, to){
      const dates = Object.keys(classStore).sort().reverse().filter(d=>{
        if(!from && !to) return true;
        if(from && d < from) return false;
        if(to && d > to) return false;
        return true;
      });
      if(dates.length===0){ wrap.innerHTML = '<div class="muted">No records found for this range.</div>'; return; }
      let html = '<table class="marks-table"><thead><tr><th>Date</th><th>Present</th><th>Absent</th><th>Late</th><th>Actions</th></tr></thead><tbody>';
      dates.forEach(date=>{
        const day = classStore[date]||{};
        let p=0,a=0,l=0; Object.keys(day).forEach(r=>{ const v = day[r]; if(v==='late') l++; else if(v==='present' || v===true) p++; else a++; });
        html += `<tr data-date="${date}"><td>${date}</td><td>${p}</td><td>${a}</td><td>${l}</td><td><button class="btn btn-muted edit-day" data-date="${date}">Edit</button></td></tr>`;
      });
      html += '</tbody></table>';
      wrap.innerHTML = html;
      wrap.querySelectorAll('.edit-day').forEach(b=> b.onclick = (e)=>{ const d = e.target.dataset.date; openEditDay(d); });
    }
    function openEditDay(dateStr){
      const day = classStore[dateStr] || {};
      // build editable table — use stored class students if available
      const storedStudents = (JSON.parse(localStorage.getItem('classStudents')||'{}')[className]) || Array.from({length:60}).map((_,i)=>({ roll: `${className.substring(0,2).toUpperCase()}-${100+i}`, name:`Student ${i+1}`}));
      let h = '<div style="max-height:400px;overflow:auto"><table class="marks-table"><thead><tr><th>Roll</th><th>Name</th><th>Status</th></tr></thead><tbody>';
      storedStudents.forEach(s=>{ const v = day[s.roll]===true ? 'present' : (day[s.roll]===false ? 'absent' : (day[s.roll]||'absent')); h += `<tr><td>${s.roll}</td><td>${s.name}</td><td><select class="edit-status" data-roll="${s.roll}"><option value="present" ${v==='present'?'selected':''}>Present</option><option value="absent" ${v==='absent'?'selected':''}>Absent</option><option value="late" ${v==='late'?'selected':''}>Late</option></select></td></tr>` });
      h += '</tbody></table></div><div style="margin-top:8px"><button id="saveDayEdits" class="btn btn-save">Save Changes</button> <button id="cancelDayEdits" class="btn btn-muted">Cancel</button></div>';
      wrap.innerHTML = `<h3>Edit ${dateStr}</h3>`+h;
      document.getElementById('cancelDayEdits').onclick = ()=> renderRecords(document.getElementById('recFrom').value, document.getElementById('recTo').value);
      document.getElementById('saveDayEdits').onclick = ()=>{
        const selects = wrap.querySelectorAll('.edit-status');
        const newData = {};
        selects.forEach(s=> newData[s.dataset.roll] = s.value);
        // write and log changes
        const teacher = (profileName && profileName.textContent) ? profileName.textContent : 'Teacher';
        const ts = new Date().toISOString();
        const existingDay = classStore[dateStr] || {};
        const logs = [];
        Object.keys(newData).forEach(r=>{ const prev = existingDay[r]===true ? 'present' : (existingDay[r]===false ? 'absent' : (existingDay[r]||'absent')); const next=newData[r]; if(prev !== next) logs.push({ class: className, date: dateStr, roll: r, prev, next, teacher, timestamp: ts }); });
        // save
        const storeAll = _getStore(); storeAll[className] = storeAll[className]||{}; storeAll[className][dateStr] = newData; _saveStore(storeAll);
        if(logs.length){ const all = _getLogs().concat(logs); _saveLogs(all); }
        showToast('Saved edits for ' + dateStr, 'success');
        renderRecords(document.getElementById('recFrom').value, document.getElementById('recTo').value);
      };
    }
    // render the records table for the selected range
    document.getElementById('recFilter').onclick = ()=> renderRecords(document.getElementById('recFrom').value, document.getElementById('recTo').value);

    // Wire the View Students button to display the default 60 students for this class
    document.getElementById('viewStudentsBtn').onclick = ()=>{
      const students = JSON.parse(localStorage.getItem('classStudents')||'{}')[className] || [];
      if(students.length===0){ wrap.innerHTML = '<div class="muted">No students configured for this class.</div>'; return; }
      let html = '<div style="max-height:420px;overflow:auto"><table class="marks-table"><thead><tr><th>Roll</th><th>Name</th></tr></thead><tbody>';
      students.forEach(s=>{ html += `<tr><td>${s.roll}</td><td>${s.name}</td></tr>`; });
      html += '</tbody></table></div>';
      wrap.innerHTML = `<h3>Students — ${className}</h3>` + html;
    };

    // Wire Import Students button: open modal to paste CSV/TSV and import into this class
    document.getElementById('importStudentsBtn').onclick = ()=>{
      const modalId = 'importStudentsModal'; if(document.getElementById(modalId)) document.getElementById(modalId).remove();
      const html = `
        <div class="modal-overlay" id="${modalId}">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Import Students — ${className}</h2>
              <button class="close-button" id="closeImport"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <p>Paste CSV/TSV rows (with or without header). Columns can be separated by tab or comma.</p>
              <textarea id="importPasteArea" style="width:100%;height:160px;padding:8px;border:1px solid rgba(0,0,0,0.08);border-radius:6px" placeholder="Paste rows here (e.g. Roll,Name or Name\tRoll etc)"></textarea>
              <div style="display:flex;gap:8px;margin-top:8px;align-items:center">
                <button id="previewImportBtn" class="btn btn-primary">Preview</button>
                <button id="applyImportBtn" class="btn btn-save" disabled>Import</button>
                <button id="cancelImportBtn" class="btn btn-muted">Cancel</button>
              </div>
              <div id="importPreviewArea" style="margin-top:12px;max-height:260px;overflow:auto"></div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', html);
      document.getElementById('closeImport').onclick = ()=> document.getElementById(modalId).remove();
      document.getElementById('cancelImportBtn').onclick = ()=> document.getElementById(modalId).remove();

      // parsing helpers
      function detectDelimiter(s){ if(s.indexOf('\t')!==-1) return '\t'; if((s.match(/,/g)||[]).length > (s.match(/\t/g)||[]).length) return ','; return /,|\t/.test(s)?(s.indexOf('\t')!==-1?'\t':','):'\t'; }
      function splitLines(s){ return s.split(/\r?\n/).map(r=>r.trim()).filter(r=>r.length>0); }
      function parseRows(text){ const lines = splitLines(text); if(lines.length===0) return { cols:[], rows:[] };
        const delim = detectDelimiter(lines.slice(0,5).join('\n'));
        const rows = lines.map(l=> l.split(delim).map(c=> c.trim()));
        return { cols: rows[0].length ? rows[0].map((_,i)=>`Column ${i+1}`) : [], rows };
      }

      // try to build preview and enable import
      let previewRows = [];
      document.getElementById('previewImportBtn').onclick = ()=>{
        const txt = document.getElementById('importPasteArea').value || '';
        const lines = splitLines(txt);
        if(lines.length===0){ document.getElementById('importPreviewArea').innerHTML = '<div class="muted">No rows found to preview.</div>'; document.getElementById('applyImportBtn').disabled = true; return; }
        const delim = detectDelimiter(lines.slice(0,5).join('\n'));
        const parsed = lines.map(l=> l.split(delim).map(c=>c.trim()));
        // build a simple preview and auto-detect probable roll/name columns
        const colCount = Math.max(...parsed.map(r=>r.length));
        // default guesses: find numeric-looking column as roll, and a column with letters as name
        let rollCol = -1, nameCol = -1;
        for(let c=0;c<colCount;c++){
          const sample = parsed.map(r=> r[c]||'').join(' ');
          if(rollCol===-1 && /\d{2,}/.test(sample)) rollCol = c;
          if(nameCol===-1 && /[A-Za-z]/.test(sample) && !/\d{3,}/.test(sample)) nameCol = c;
        }
        if(rollCol===-1) rollCol = 0; if(nameCol===-1) nameCol = (rollCol===0?1:0);
        previewRows = parsed.map(cols=>({ roll: (cols[rollCol]||'').toString(), name: (cols[nameCol]||'').toString(), raw: cols }));
        // render preview table with detected mapping and allow user to change mapping
        let html = '<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">Detected mapping: '
                 +`<strong>Roll: Column ${rollCol+1}</strong> — <strong>Name: Column ${nameCol+1}</strong>`
                 +'</div>';
        html += '<table class="marks-table" style="width:100%"><thead><tr><th>Roll</th><th>Name</th></tr></thead><tbody>';
        previewRows.slice(0,200).forEach(r=> html += `<tr><td>${escapeHtml(r.roll)}</td><td>${escapeHtml(r.name)}</td></tr>`);
        html += '</tbody></table>';
        document.getElementById('importPreviewArea').innerHTML = html;
        document.getElementById('applyImportBtn').disabled = previewRows.length===0;
      };

      // apply import: save into localStorage under classStudents[className]
      document.getElementById('applyImportBtn').onclick = ()=>{
        if(previewRows.length===0) return showToast('Nothing to import', 'error');
        const studentsKey = 'classStudents';
        const all = JSON.parse(localStorage.getItem(studentsKey)||'{}');
        // remove empty rows and ensure roll & name
        const cleaned = previewRows.filter(r=> (r.roll||r.name)).map((r,i)=>({ roll: r.roll || (`${className.substring(0,2).toUpperCase()}-${200+i}`), name: r.name || (`Student ${i+1}`) }));
        all[className] = cleaned;
        localStorage.setItem(studentsKey, JSON.stringify(all));
        showToast(`Imported ${cleaned.length} students into ${className}`, 'success');
        document.getElementById(modalId).remove();
        // refresh the records modal content to show new students when View Students clicked
      };
    };

    // render tasks area and records table
    renderTasks();
    renderRecords();
  }

  // Student profile modal
  function showStudentProfile(className, roll){
    const modalId = 'studentProfileModal';
    const existing = document.getElementById(modalId); if(existing) existing.remove();
    const notes = (JSON.parse(localStorage.getItem('studentNotes')||'{}')[className]||{})[roll] || '';
    // compute attendance summary
    const store = JSON.parse(localStorage.getItem('attendanceStore')||'{}');
    const classStore = store[className] || {};
    let present=0, absent=0, late=0, days=0; Object.keys(classStore).forEach(d=>{ days++; const v = classStore[d][roll]; if(v==='late') late++; else if(v==='present' || v===true) present++; else absent++; });
    const html = `
      <div class="modal-overlay" id="${modalId}">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Profile — ${roll}</h2>
            <button class="close-button" id="closeProfile"><i class="fas fa-times"></i></button>
          </div>
          <div style="display:flex;gap:16px;align-items:flex-start">
            <div style="flex:1">
              <p><strong>Name:</strong> ${roll}</p>
              <p><strong>Roll No:</strong> ${roll}</p>
              <p><strong>Parent:</strong> Not available</p>
              <p><strong>Notes:</strong> ${notes}</p>
            </div>
            <div style="width:260px">
              <canvas id="profileChart"></canvas>
              <div style="text-align:center;margin-top:8px">${present} Present • ${absent} Absent • ${late} Late • ${days} Days</div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById('closeProfile').onclick = ()=> document.getElementById(modalId).remove();
    // chart
    const ctx = document.getElementById('profileChart');
    if(ctx){ new Chart(ctx, { type:'pie', data:{ labels:['Present','Absent','Late'], datasets:[{ data:[present,absent,late], backgroundColor:['#43e97b','#ed6c63','#f59e0b'] }]}, options:{responsive:true,maintainAspectRatio:true}}); }
  }

  // Analytics (attendance trend for a class)
  function showAttendanceAnalytics(className){
    const modalId = 'analyticsModal'; if(document.getElementById(modalId)) document.getElementById(modalId).remove();
    const store = JSON.parse(localStorage.getItem('attendanceStore')||'{}'); const classStore = store[className]||{}; const dates = Object.keys(classStore).sort();
    const labels = dates.slice(-30); const data = labels.map(d=>{
      const day = classStore[d]||{}; const total = Object.keys(day).length || 1; const present = Object.values(day).filter(v=> v==='present' || v===true).length; return Math.round((present/total)*100);
    });
    const html = `
      <div class="modal-overlay" id="${modalId}">
        <div class="modal-content">
          <div class="modal-header"><h2 class="modal-title">Attendance Trend — ${className}</h2><button class="close-button" id="closeAnalytics"><i class="fas fa-times"></i></button></div>
          <canvas id="analyticsChart" style="max-height:320px"></canvas>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById('closeAnalytics').onclick = ()=> document.getElementById(modalId).remove();
    const ctx = document.getElementById('analyticsChart'); if(ctx){ new Chart(ctx, { type:'line', data:{ labels, datasets:[{ label:'Present %', data, borderColor:'#6366f1', backgroundColor:'rgba(99,102,241,0.08)', tension:0.3 }]}, options:{responsive:true,maintainAspectRatio:false} }); }
  }

  // Low attendance alerts
  function renderLowAttendanceAlerts(){
    // compute per-class and create alerts panel
    const alertsId = 'alertsPanel'; let panel = document.getElementById(alertsId);
    if(!panel){ panel = document.createElement('div'); panel.id = alertsId; panel.style.margin='12px 0'; panel.style.padding='8px'; panel.style.borderRadius='8px'; panel.style.background='rgba(255,255,255,0.02)'; const dash = document.getElementById('dashboard') || document.body; dash.insertAdjacentElement('afterbegin', panel); }
    const threshold = 75;
    const store = JSON.parse(localStorage.getItem('attendanceStore')||'{}');
    let html = '<h3 style="margin:0 0 8px 0">Alerts</h3><div class="alerts-list">';
    let found=false;
    CLASSES.forEach(cls=>{
      const classStore = store[cls] || {};
      const students = Array.from({length:60}).map((_,i)=>`${cls.substring(0,2).toUpperCase()}-${100+i}`);
      students.forEach(r=>{
        // compute percent
        const dates = Object.keys(classStore);
        const total = dates.length;
        if(total===0) return;
        const present = dates.reduce((acc,d)=> acc + ((classStore[d][r]===true || classStore[d][r]==='present')?1:0), 0);
        const pct = Math.round((present/total)*100);
        if(pct < threshold){ found=true; html += `
          <div class="alert-item">
            <div>
              <div class="alert-text">${r} <span class="alert-meta">(${cls}) — ${pct}%</span></div>
            </div>
            <div class="alert-actions">
              <a href="mailto:?subject=Attendance%20Alert%20for%20${r}&body=Your%20child%20has%20${pct}%25%20attendance" class="alert-email">Email Parent</a>
            </div>
          </div>`;
        }
      });
    });
  html += '</div>';
  panel.innerHTML = found ? html : '<div class="muted">No alerts — all students above threshold</div>';
  }

// Dark mode toggle
document.getElementById("darkToggle").onclick=()=>document.body.classList.toggle("dark");

// Logout button
document.getElementById("openLogout").onclick=()=>{
  profileCard.style.display="none";
  cardsGrid.style.display="none";
  marksArea.style.display="none";
  marksGrid.innerHTML="";
  cardsGrid.innerHTML="";
  studentLogin.style.display="flex";
};

// -- Sidebar / Navigation handlers and UX helpers --
function showPage(page) {
  // Map logical page names to DOM element IDs
  const map = {
    dashboard: 'dashboard',
    subjects: 'cardsGrid',
    grades: 'marksArea',
    assignments: 'assignmentsCard',
    notices: 'noticeBoard',
    profile: 'profileCard'
  };

  // Hide all possible page containers
  const containers = ['dashboard','cardsGrid','marksArea','assignmentsCard','noticeBoard','profileCard','teacherAnalytics'];
  containers.forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    // smooth hide
    el.classList.remove('visible');
    el.classList.add('hidden');
    // ensure display:none after animation
    setTimeout(()=>{
      if(el.classList.contains('hidden')) el.style.display = 'none';
    }, 250);
  });

  const targetId = map[page] || map['dashboard'];
  const target = document.getElementById(targetId);
  if(target){
    target.style.display = '';
    // small defer for transition
    requestAnimationFrame(()=>{
      target.classList.remove('hidden');
      target.classList.add('visible');
    });
  }

  // Page-specific behaviours
  switch(page){
    case 'subjects':
      // Ensure subject cards are populated
      try{
        const semSel = document.getElementById('semesterSelect');
        const sem = semSel ? semSel.value : 3;
        updateSemester(sem);
      }catch(e){}
      break;
    case 'grades':
      // Show marks area and populate marks (via updateSemester)
      try{ updateSemester(document.getElementById('semesterSelect') ? document.getElementById('semesterSelect').value : 3); }catch(e){}
      break;
    case 'assignments':
      // nothing extra needed — the section contains static items
      break;
    case 'attendance':
      // Show dashboard and scroll to attendance card with a quick highlight
      try{
        const attCard = document.querySelector('.attendance-card');
        if(attCard){
          // ensure dashboard visible
          const dash = document.getElementById('dashboard');
          if(dash){ dash.style.display = ''; dash.classList.remove('hidden'); dash.classList.add('visible'); }
          // scroll into view and highlight briefly
          attCard.scrollIntoView({behavior:'smooth', block:'center'});
          attCard.classList.add('highlight');
          setTimeout(()=> attCard.classList.remove('highlight'), 1600);
        }
      }catch(e){}
      break;
    case 'profile':
      // nothing extra, profile displays in its section
      break;
    case 'notices':
      // ensure notices are visible
      break;
    default:
      // dashboard default: refresh charts
      try{ initializeCharts(); }catch(e){}
  }

  // update active class on sidebar
  const items = document.querySelectorAll('.sidebar-menu li');
  items.forEach(it=>{
    if(it.dataset && it.dataset.page === page) it.classList.add('active'); else it.classList.remove('active');
  });
}

function setupEventListeners(){
  const items = document.querySelectorAll('.sidebar-menu li');
  items.forEach(li=>{
    // ensure keyboard accessibility
    li.setAttribute('tabindex','0');
    li.setAttribute('role','button');
    // set accessible label/tooltip from child span if present
    const span = li.querySelector('span');
    if(span){
      const txt = span.textContent.trim();
      li.setAttribute('aria-label', txt);
      li.setAttribute('data-tooltip', txt);
    }
    const page = li.dataset ? li.dataset.page : li.getAttribute('data-page');
    li.addEventListener('click', ()=> showPage(page));
    li.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        showPage(page);
      }
    });
  });

  // Provide a default initial view
  // If profile is visible (logged out state) keep it hidden otherwise show dashboard
  const defaultPage = 'dashboard';
  showPage(defaultPage);
}

// If DOMContentLoaded already fired earlier, ensure handlers exist
if(document.readyState === 'complete' || document.readyState === 'interactive'){
  try{ setupEventListeners(); } catch(e){}
}
