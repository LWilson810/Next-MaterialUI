import Head from 'next/head';
// import { subDays, subHours } from 'date-fns';
import { Stack, Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Appoinment } from '../sections/overview/appoinments.js';
import { OverviewRecentMessages } from 'src/sections/overview/overview-recent-messages';
import { OverviewStatistic } from 'src/sections/overview/overview-statistic.js';
// import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
// import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
// import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewActivity } from 'src/sections/overview/overview-activity';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const now = new Date();



// const useStyles = makeStyles((theme) => ({
//   gridContainer: {
//     display: 'flex',
//     flexWrap: 'wrap-reverse', // Reverse the wrapping order
//   },
// }));

// const classes = useStyles();

const Page = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  return <>
    <Head>
      <title>
        Overview | QuanMed
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        backgroundColor: 'black',
        paddingTop: '0px',
        paddingBottom: 0
      }}
    >
      <Container maxWidth="80vw" style={{margin:0}}>
        <Stack>
          <h1 style={{ color: 'cornflowerblue', margin: '0px', fontFamily: " Poppins-Bold" }}>My DeMed Dashboard</h1>
        </Stack>
        <Stack>
          <h3 style={{ color: 'white' }}>Welcome to the feature: Decentralized medicine</h3>
        </Stack>

        <Grid
          container
          spacing={3}
          sx={{ marginTop: '0px' }}
          style={{display: 'flex', flexDirection:'row'}}
        >
          <Grid
            xs={48}
            sm={24}
            md={12}
            lg={8}
            order={1}
            
          >
            <OverviewStatistic
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{  backgroundColor: 'rgba(20, 27, 34, 0.70)', height:'100%'}}
            />
          </Grid>
          <Grid
            xs={48}
            md={8}
            lg={4}
            order={2}
          >
            <OverviewActivity
              sx={{ backgroundColor:'rgba(20, 27, 34, 0.70)', height: '100%' }}
            />
          </Grid>
            <Grid
              xs={48}
              md={4}
              lg={4}
              order={isLargeScreen ?4:3}
            >
              <Appoinment

                sx={{  backgroundColor: 'rgba(20, 27, 34, 0.70)', height: '100%' }}
              />
            </Grid>
            <Grid
              xs={48}
              md={12}
              lg={8}
              order={isLargeScreen ?3:4}
            >
              <OverviewRecentMessages
                orders={[
                  {
                    cName: 'Sikago & Sons',
                    country: 'UK',
                    date: "10 Jan 2014",
                    amount: '$234.43',
                    date1: "10 Jan 2014",
                    paid: 'QMD Token'
                  },
                  {
                    cName: 'Fast & Tracks',
                    country: 'UK',
                    date: "10 Jan 2014",
                    amount: '$234.43',
                    date1: "10 Jan 2014",
                    paid: 'QMD Token'
                  },
                  {
                    cName: 'Fanish & company',
                    country: 'UK',
                    date: "10 Jan 2014",
                    amount: '$234.43',
                    date1: "10 Jan 2014",
                    paid: 'QMD Token'
                  },

                ]}
                sx={{  backgroundColor: 'rgba(20, 27, 34, 0.70)', height: '100%'}}
              />
            </Grid>
          </Grid>
          {/* <Grid
            xs={48}
            md={5}
            lg={4}
          >
            <Appoinment
             
              sx={{ backgroundColor:'rgba(20, 27, 34, 0.70)'}}
            />
          </Grid> */}
        {/* </Grid> */}
      </Container>
    </Box>
  </>
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
