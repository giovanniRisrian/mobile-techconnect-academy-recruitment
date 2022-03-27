import clientService from './ApiClient';

const UploadResumeService = () => {
  const callUploadResumeService = async (params, header) => {
    try {
      const resp = await fetch('http://10.0.2.2:8181/api/resume/upload', {
        method: 'post',
        headers: header,
        body: params,
      })
        .then(response => response.json())
        .then(response => {
          //   console.log(response);
          return response;
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          throw error;
        });
      return resp;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const callUploadPictureService = async (params, header) => {
    try {
      const resp = await fetch(
        'http://10.0.2.2:8181/api/applicant/mobile/update/picture',
        {
          method: 'put',
          headers: header,
          body: params,
        },
      )
        .then(response => response.json())
        .then(response => {
          //   console.log(response);
          return response;
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          throw error;
        });
      return resp;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const postGetDataByListId = async (params, header) => {
    const response = await clientService().postFile(
      '/program/list',
      params,
      header,
    );
    return response;
  };
  const putUpdateProfile = async (params, header) => {
    const response = await clientService().put(
      '/applicant/mobile/update',
      params,
      header,
    );
    return response;
  };

  const getDataApplicantbyId = async header => {
    const response = await clientService().getWithAuth('/user', header);
    return response;
  };
  const getJobReccomendationId = async header => {
    const response = await clientService().getWithAuth('/user/jobrec', header);
    return response;
  };
  return {
    callUploadResumeService,
    postGetDataByListId,
    putUpdateProfile,
    getDataApplicantbyId,
    getJobReccomendationId,
    callUploadPictureService,
  };
};

export default UploadResumeService;
