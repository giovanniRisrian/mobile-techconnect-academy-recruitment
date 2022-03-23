import clientService from "./ApiClient";

const ProfileService = () => {
  const getDataApplicantbyId = async (params, header) => {
    try {
      let data = await clientService().get(`/user`, header);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const updateDataApplicant = async (params, header) => {
    try {
      let data = await clientService().put(`/applicant/update`, params, header);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return { updateDataApplicant, getDataApplicantbyId };
};

export default ProfileService;
