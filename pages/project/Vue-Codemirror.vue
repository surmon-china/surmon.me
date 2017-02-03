<template>
  <div class="project">
    <codemirror v-model="code" :options="editorOption"></codemirror>
    <pre>{{ code }}</pre>
    <textarea v-model="code"></textarea>
    <p>Codemirror</p>
  </div>
</template>

<script>
  export default {
    name: 'Project-Vue-Codemirror',
    data() {
      return {
        code: 'const a = 10',
        editorOption: {
          tabSize: 4,
          mode: 'text/javascript',
          theme: 'base16-dark',
          lineNumbers: true,
          line: true,
          // ...
        }
      }
    }
  }
</script>
