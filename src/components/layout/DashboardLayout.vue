<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 class="text-xl font-bold mb-6">FinView</h2>
      <nav class="space-y-4">
        <RouterLink to="/dashboard" class="block text-gray-700 hover:text-indigo-600">
          Dashboard
        </RouterLink>
      </nav>
    </aside>


    <!-- Content -->
    <main class="flex-1">
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-lg font-semibold">Dashboard</h1>
      </header>


      <section class="p-6">
        <router-view />
      </section>
    </main>
  </div>
</template>


<script setup>
</script>