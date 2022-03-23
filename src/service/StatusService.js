import clientService from './ApiClient';

const StatusService = () => {
  async function getAppliedProgram(params, header) {
    //console.log("CEK TOKEN YANG HEADER");
    //console.log(header);
    const response = await clientService().get(
      `/program_applicant/applicant?id=${params}`,
      header,
    );
    return response;
  }
  async function getDetailAppliedProgram(idProgram, idApplicant, header) {
    const response = await clientService().get(
      `/program_applicant/detailed?program_id=${idProgram}&applicant_id=${idApplicant}`,
      header,
    );
    return response;
  }
  return {
    getAppliedProgram,
    getDetailAppliedProgram,
  };
};
export default StatusService;
