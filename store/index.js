
/**
 * App state
 */
export const state = () => ({
  // UI state
  sidenav: null,

  // Resume values
  resume_name: "",
  resume_title: "",
  resume_objective: "",
  resume_contact: [
    { icon: 'fas fa-phone', body: "(555) 555-5555" },
  ]
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
  
}