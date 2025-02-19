<template>
  <div class="dashboard-page">
    <div class="content-container">
      <h1 class="dashboard-title">Welcome to your Dashboard</h1>
      <p class="dashboard-description">Here you can view various statistics, reports, and other information related to your account.</p>
      
      <div class="stats-container">
        <div class="stat-card">
          <h2 class="text-2xl font-bold">{{ $t('dashboard') }}</h2>
          <p>1,245</p>
        </div>
        <div class="stat-card">
          <h3>Total Sales</h3>
          <p>$5,230</p>
        </div>
        <div class="stat-card">
          <h3>Pending Orders</h3>
          <p>36</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.content-container {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.dashboard-description {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.stat-card {
  flex: 1;
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
