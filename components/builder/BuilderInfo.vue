<template>
  <div>
    <p>
      This site is a tool to generate nice-looking resumes with minimal work. You enter some information about yourself (name, work experience, etc.), select a resume template, and export the result as a PDF.
    </p>
    <p>
      Use the tabs at the bottom of this panel to switch to data and style editing modes. Use the buttons in the top bar to import/export a resume from this site. You can save your resume as a PDF, or export the data as JSON. Any data exported from this site as JSON can be imported back in. (Data is stored in LocalStorage, so it will persist between sessions using the same browser.)
    </p>
    <p>
      <strong>NOTE</strong>: for the best print results, use Google Chrome. Upon printing, make sure to print background graphics, hide headers and footers, and remove all page margins.
    </p>
    <p>
      This is a site built by <a href="https://gksander.com" target="_blank" class="primary--text">Grant Sander</a>. The code for this site is open source and can be found <a href="https://github.com/gksander/resume-builder" target="_blank" class="primary--text">on GitHub</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: "BuilderInfo",
}
</script>
