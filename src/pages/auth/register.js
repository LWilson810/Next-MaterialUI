import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography, styled, Checkbox } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
// import { makeStyles } from '@material-ui/core/styles';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));
// const useStyles = makeStyles({
//   textField: {
//     '& .MuiInputBase-input': {
//       color: '#AAA7B2', // Set your desired color here
//     },
//   },
// });

const Register = () => {
  // const classes = useStyles();
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      confirm_password: Yup
        .string()
        .max(255)
        .required('Confirm password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signUp(values.email, values.name, values.password);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'black',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            width: '100%',
          }}
        >
          <div>

            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={2}>
                <TextField
                  sx={{
                    '& input': {
                      color: '#AAA7B2', // Set your desired color here
                    },

                  }}
                  size='medium'
                  InputProps={{ sx: { borderRadius: 3 } }}
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Full name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  sx={{
                    '& input': {
                      color: '#AAA7B2', // Set your desired color here
                    }
                    , fontFamily:'Poppins-Regular'
                  }}
                  size='medium'
                  InputProps={{ sx: { borderRadius: 3 } }}
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  sx={{
                    '& input': {
                      color: '#AAA7B2', // Set your desired color here
                    }
                    , fontFamily:'Poppins-Regular'
                  }}
                  size='medium'
                  InputProps={{ sx: { borderRadius: 3 } }}
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  sx={{
                    '& input': {
                      color: '#AAA7B2', // Set your desired color here
                    },
                    fontFamily:'Poppins-Regular'
                  }}
                  size='medium'
                  InputProps={{ sx: { borderRadius: 3 } }}
                  error={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                  fullWidth
                  helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                  label="Confirm password"
                  name="confirm_password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.confirm_password}
                />

                <FlexBox gap={1}>
                  <Checkbox
                    size="small"
                    name="remember"
                    // onChange={handleChange}
                    checked={formik.values.remember}
                    sx={{ padding: 0 }}
                  />

                  <div style={{ color: 'white', fontFamily:'Poppins-Regular' }}>By creating an account you agree to Privacy Pc</div>
                </FlexBox>
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 1 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="small"
                sx={{ mt: 2, textTransform: 'uppercase', backgroundColor: '#607BCC', borderRadius: 10, fontFamily:'Poppins-Regular' }}
                type="submit"
                variant="contained"
              >
                sign up
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Register;
