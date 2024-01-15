const mutation = {
  CHACH_FILTER(state , payload){
    state.filterScimaCached = payload
  },
  CHANGE_COMPANY_LIST(state , payload){
    state.company_list = payload
    // console.log(payload);
  }
};

export default mutation;
