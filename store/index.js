import ResumeList from "~/assets/js/ResumeList";

/**
 * App state
 */
export const state = () => ({
  // UI state
  sidenav: null,

  // Resume values
  resume_name: "Jane Doe",
  resume_title: "Web Developer",
  resume_objective: "This is an __objective__ statement with Markdown.",
  resume_contact: [
    { icon: 'fas fa-phone', body: "(555) 555-5555" },
  ],
  resume_education: [
    { title: "Degree", date: "Date", description: "..." }
  ],
  resume_experience: [
    { title: "Super Important Job", date: "June 1993 - Current", description: "Job description here.\n* Achievement 1\n* Achievement 2" },
  ],
  resume_tools: [
    { icon: 'fab fa-html5', body: "HTML5" },
  ],

  // Resume styling
  resume_style: ResumeList[0].id,
  resume_primary_color: "rgb(88,69,226)",
  resume_text_color: "rgb(0,0,0)",
  resume_header_text_color: "rgb(255,255,255)",
})


/**
 * App mutations
 */
export const mutations = {

  // General property setter
  SET_VALUE (state, { key, value }) {
    state[key] = value;
  },

  // Update a contact line
  SET_CONTACT_LINE (state, { i, line }) {
    state.resume_contact.splice(i, 1, line);
  },

  // Add a contact line
  ADD_CONTACT_LINE (state) {
    state.resume_contact.push({ icon: 'fas fa-phone', body: "(555) 555-5555" });
  },

  // Delete a contact line
  DELETE_CONTACT_LINE (state, i) {
    state.resume_contact.splice(i, 1);
  },

  // Update a contact line
  SET_TOOL_LINE (state, { i, line }) {
    state.resume_tools.splice(i, 1, line);
  },

  // Add a contact line
  ADD_TOOL_LINE (state) {
    state.resume_tools.push({ icon: 'fas fa-laptop-code', body: "HTML5" });
  },

  // Delete a contact line
  DELETE_TOOL_LINE (state, i) {
    state.resume_tools.splice(i, 1);
  },

  // Update a education line
  SET_EDUCATION_LINE (state, { i, line }) {
    state.resume_education.splice(i, 1, line);
  },

  // Add a education line
  ADD_EDUCATION_LINE (state) {
    state.resume_education.push({ title: "Degree", date: "...", description: "..." });
  },

  // Delete a education line
  DELETE_EDUCATION_LINE (state, i) {
    state.resume_education.splice(i, 1);
  },

  // Update a experience line
  SET_EXPERIENCE_LINE (state, { i, line }) {
    state.resume_experience.splice(i, 1, line);
  },

  // Add a experience line
  ADD_EXPERIENCE_LINE (state) {
    state.resume_experience.push({ title: "Job title", date: "...", description: "..." });
  },

  // Delete a experience line
  DELETE_EXPERIENCE_LINE (state, i) {
    state.resume_experience.splice(i, 1);
  },
  
  // Set resume data (from import)
  SET_RESUME_DATA (state, data) {
    // Loop through state keys, and set data if we find it
    for (let key in state) {
      if (data[key] !== undefined) state[key] = data[key];
    }
  },
}