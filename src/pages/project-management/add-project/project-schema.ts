import * as Yup from 'yup';

export const appProjectSchema = Yup.object().shape({
  projectName: Yup.string().required('Field is required'),
  teams: Yup.array()
    .min(1)
    .of(
      Yup.object().shape({
        teamLead: Yup.object().required('Field is required'),
        teamName: Yup.string().required('Field is required'),
        teamMembers: Yup.array()
          .min(0)
          .of(
            Yup.object().shape({
              name: Yup.string().required('Field is required'),
            }),
          ),
      }),
    ),
});
