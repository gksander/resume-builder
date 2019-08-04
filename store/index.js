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
  resume_objective: "This is an __objective__ statement with Markdown.\n* Point 1\n* Point 2\n\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga necessitatibus veritatis nihil eveniet nulla, blanditiis quisquam repellendus! Perspiciatis expedita minus, provident dolor porro ad, tenetur perferendis quidem, ea quia sapiente.",
  resume_contact: [
    { icon: 'fas fa-phone', body: "(555) 555-5555" },
    { icon: 'fas fa-at', body: "janedoe@fake.com" },
    { icon: 'fas fa-map-marker-alt', body: "Somewhere, USA" },
    { icon: 'fab fa-twitter', body: "twitter handle" },
  ],
  resume_education: [
    { title: "Degree", date: "May 2019", description: "This is a description about the degree. Also accepts __markdown__." }
  ],
  resume_experience: [
    { title: "Web Developer", date: "Jan. 2019 - Current", description: "Job description here. Feel free to use Markdown to make lists. \n* Achievement 1\n* Achievement 2" },
    { title: "Astronaut", date: "May 1993 - Jan. 2019", description: "*NASA - United States of America*\nExplored outer space.\n* Walked on the moon.\n* Circle Mars." },
  ],
  resume_skills: [
    { icon: 'fab fa-html5', body: "HTML5" },
    { icon: 'fab fa-css3', body: "CSS3" },
    { icon: 'fab fa-js', body: "JavaScript" },
    { icon: 'fab fa-node-js', body: "Node.JS" },
    { icon: 'fab fa-php', body: "PHP" },
  ],

  // Resume styling
  resume_style: ResumeList[0].id,
  resume_icon: "fas fa-code",
  resume_primary_color: "#1D34CC",
  resume_text_color: "#000000",
  resume_header_text_color: "#ffffff",
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
  SET_SKILL_LINE (state, { i, line }) {
    state.resume_skills.splice(i, 1, line);
  },

  // Add a contact line
  ADD_SKILL_LINE (state) {
    state.resume_skills.push({ icon: 'fas fa-laptop-code', body: "HTML5" });
  },

  // Delete a contact line
  DELETE_SKILL_LINE (state, i) {
    state.resume_skills.splice(i, 1);
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