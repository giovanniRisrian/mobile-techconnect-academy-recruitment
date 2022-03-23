import clientService from './ApiClient';
 

const VacancyService = () => {
  const getVacancyList = async (name,type) => {
    try {
      let data = await clientService().get(`/program?&sort_by=created_at&order_by=desc&name=${name}&program_type=${type}`)
      return data;
    } catch (err) {
        throw err
    }
  };
  const getVacancyId = async(id) =>{
    try {
        let data = await clientService().get(`/program?id=${id}`)
        return data;
      } catch (err) {
          throw err
      }
  }
  const applyProgram = async(params, header) =>{
    try {
        let data = await clientService().postwithToken(`/program_applicant/apply`, params, header)
        return data;
      } catch (err) {
          throw err
      }
  }
  const getUserId = async(header) => {
    try {
      let data = await clientService().getWithToken(`/user`, header)
      return data;
    } catch (err) {
        throw err
    }
  }
  const getType = async() => {
    try {
      let data = await clientService().get(`/program/programtype`)
      return data;
    } catch (err) {
        throw err
    }
  }
  return{
    getVacancyList,
    getVacancyId,
    applyProgram,
    getUserId,
    getType
  }
};

export default VacancyService;