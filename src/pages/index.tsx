import { Box } from '@mui/material';
import { AppBar } from '@/components/Appbar';
import { Timeline } from '@/components/Timeline';
import { CardView } from '@/components/CardsView';
import { trpc } from './utils/trpc';


export default function Home() {
  const data = trpc.hello.useQuery({ text: 'Hello' });
  console.log('lolo', data.data)
  return (
    <>
      <Box>
        <AppBar />
        <Timeline />
        <CardView />
      </Box>
    </>
  )
}
