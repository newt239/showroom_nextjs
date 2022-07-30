import type { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { nextState } from 'src/store/game';

import { Box } from '@chakra-ui/react';

const NextPreview: NextPage = () => {
  const next = useRecoilValue(nextState);
  return (
    <Box suppressHydrationWarning>
      next: {next}
    </Box>
  )
}

export default NextPreview
