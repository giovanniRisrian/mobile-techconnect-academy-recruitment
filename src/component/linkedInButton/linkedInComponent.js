import React from 'react';
import {useState} from 'react';
import {Modal, View, Text, TextInput} from 'react-native';
import {Button} from 'native-base';

const LinkedInButton = ({bloc}) => {
  const [show, setShow] = useState(false);
  const [linkedin, setLinkedin] = useState(''); //untuk menyimpan link linkedin
  // const {postGettingDataLinkedinProfile} = bloc();
  const postGettingDataLinkedinProfile = () => {};
  const onSubmit = () => {};

  const putProfileLinkedin = async (values, context) => {
    // console.log(linkedin)
    // console.log(values,context)
    const config = {
      headers: {
        Authorization: `Bearer ${context.userInfo}`,
      },
    };
    const resp = await postGettingDataLinkedinProfile(
      {profile_id: linkedin},
      config,
    );
    console.log(resp.data);
    let mock = values;

    let profile = resp.data.data;
    // console.log("ketemukah : ", profile.length);
    // console.log("ketemukah : ", profile === null);
    console.log(profile);
    console.log('LASTNAMENYA ADALAH', profile.lasttname);
    if (profile != null) {
      console.log('terupdate');
      mock.Personal.Name = profile.firstname + ' ' + profile.lasttname;
      mock.Personal.Domicile = profile.country + ' ' + profile.province;
      if (profile.education != null) {
        let education = profile.education;
        let tempEducationArr = [];
        let tempEducation = {
          Title: '',
          Institution: '',
          Major: '',
          YearIn: '',
          YearOut: '',
          GPA: '',
        };
        for (let i = 0; i < education.length; i++) {
          console.log(education[i].period.endDate.year);
          tempEducation.Title = education[i].degree;
          tempEducation.Institution = education[i].school;
          tempEducation.Major = education[i].field;
          tempEducation.YearIn = education[i].period.startDate.year.toString();
          tempEducation.YearOut = education[i].period.endDate.year.toString();
          tempEducationArr.push(tempEducation);
          tempEducation = {
            Title: '',
            Institution: '',
            Major: '',
            YearIn: '',
            YearOut: '',
            GPA: '',
          };
        }
        mock.Education = tempEducationArr;
      }
    } else {
      console.log('Tidak Terupdate');
    }
    let min = 10000000;
    let max = 0;
    let minDate = '2000-01-01',
      maxDate;
    let nowStartYear, nowStartMonth, nowEndYear, nowEndMonth, now, end;
    if (profile.experience != null) {
      let experience = profile.experience;
      let tempExperienceArr = [];
      let tempExperience = {
        CompanyName: '',
        Position: '',
        Level: '',
        Industry: '',
        YearIn: '',
        YearOut: '',
        Description: '',
      };
      let tempArr = [];
      let tempArrDate = [];
      for (let i = 0; i < experience.length; i++) {
        tempExperience.CompanyName = experience[i].company;
        tempExperience.Position = experience[i].title;

        experience[i].period?.startDate?.year
          ? (nowStartYear = experience[i].period.startDate.year)
          : (nowStartYear = 10000000);
        experience[i].period?.startDate?.month
          ? (nowStartMonth = experience[i].period.startDate.month)
          : (nowStartMonth = 1);
        experience[i].period?.endDate?.year
          ? (nowEndYear = experience[i].period.endDate.year)
          : (nowEndYear = 0);
        experience[i].period?.endDate?.month
          ? (nowEndMonth = experience[i].period.endDate.month)
          : (nowEndMonth = 1);

        now = nowStartYear * 100 + nowStartMonth;
        end = nowEndYear * 100 + nowEndMonth;
        if (now !== 1) tempArr.push(now);
        if (end !== 1) tempArr.push(end);
        if (experience[i].period.startDate) {
          if (
            experience[i].period.startDate.year &&
            experience[i].period.startDate.month
          ) {
            experience[i].period.startDate.month =
              experience[i].period.startDate.month.toString();
            if (experience[i].period.startDate.month.length == 1) {
              experience[i].period.startDate.month =
                '0' + experience[i].period.startDate.month;
            }
            tempExperience.YearIn =
              experience[i].period.startDate.year.toString() +
              '-' +
              experience[i].period.startDate.month +
              '-01';
          } else {
            tempExperience.YearIn =
              experience[i].period.startDate.year.toString() + '-01-01';
          }
        }
        if (experience[i].period.endDate) {
          if (
            experience[i].period.endDate.year &&
            experience[i].period.endDate.month
          ) {
            experience[i].period.endDate.month =
              experience[i].period.endDate.month.toString();
            if (experience[i].period.endDate.month.length == 1) {
              experience[i].period.endDate.month =
                '0' + experience[i].period.endDate.month;
            }
            tempExperience.YearOut =
              experience[i].period.endDate.year.toString() +
              '-' +
              experience[i].period.endDate.month +
              '-01';
          } else {
            tempExperience.YearOut =
              experience[i].period.endDate.year.toString();
          }
        }
        if (now !== 1) tempArrDate.push(tempExperience.YearIn);
        if (end !== 1) tempArrDate.push(tempExperience.YearOut);
        tempExperienceArr.push(tempExperience);
        tempExperience = {
          CompanyName: '',
          Position: '',
          Level: '',
          Industry: '',
          YearIn: '',
          YearOut: '',
          Description: '',
        };
      }
      console.log('ini Semua Tanggal Int:', tempArr);
      console.log('ini Semua Tanggal Date:', tempArrDate);
      mock.WorkExperience = tempExperienceArr;

      if (!maxDate) {
        maxDate = minDate;
      }

      const max = Math.max(...tempArr);
      const indexMax = tempArr.indexOf(max);
      const min = Math.min(...tempArr);
      const indexMin = tempArr.indexOf(min);
      console.log(max, min, indexMax, indexMin);
      console.log('MINIMUM ADALAH : ', tempArr[indexMin]);
      console.log('MAXIMUM ADALAH : ', tempArr[indexMax]);

      let date1 = new Date(tempArrDate[indexMin]);
      let date2 = new Date(tempArrDate[indexMax]);

      // To calculate the time difference of two dates
      let Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Different_In_Year = Difference_In_Days / 365;
      console.log('Differentnya', Difference_In_Days);
      mock.Personal.TotalWorkingExperience =
        Different_In_Year.toFixed(2).toString();
    }
    console.log(mock);

    const formData = new FormData();
    let filepath =
      values.Personal.ResumeFile.split(':')[0].split('_')[
        values.Personal.ResumeFile.split(':')[0].split('_').length - 1
      ];

    values.Personal.ResumeFile = filepath;
    //ini udah update
    // const response = await updateDataApplicant(jsonnya, headernya);
  };

  return (
    <View>
      <Button
        variant="subtle"
        colorScheme="primary"
        size="xs"
        onPress={() => setShow(true)}>
        Fill Data With LinkedIn
      </Button>
      <Modal transparent={true} visible={show}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              marginTop: 300,
              marginLeft: 50,
              marginRight: 50,
              padding: 40,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                borderStyle: 'solid',
              }}>
              <TextInput size="xs" placeholder="LinkedIn Url" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 5,
              }}>
              <Button
                variant="subtle"
                colorScheme="red"
                size="xs"
                onPress={() => setShow(false)}>
                Cancel
              </Button>
              <Button variant="subtle" colorScheme="blue" size="xs">
                Submit
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LinkedInButton;
