document.getElementById('user-toggle').addEventListener('click', function() {
    document.getElementById('user-form').style.display = 'block';
    document.getElementById('admin-form').style.display = 'none';
    this.classList.add('active');
    document.getElementById('admin-toggle').classList.remove('active');
  });
  
  document.getElementById('admin-toggle').addEventListener('click', function() {
    document.getElementById('user-form').style.display = 'none';
    document.getElementById('admin-form').style.display = 'block';
    this.classList.add('active');
    document.getElementById('user-toggle').classList.remove('active');
  });
  
  document.getElementById('user-register-switch').addEventListener('click', function() {
    document.getElementById('user-form').style.display = 'none';
    document.getElementById('user-register').style.display = 'block';
  });
  
  document.getElementById('user-login-switch').addEventListener('click', function() {
    document.getElementById('user-register').style.display = 'none';
    document.getElementById('user-form').style.display = 'block';
  });
  