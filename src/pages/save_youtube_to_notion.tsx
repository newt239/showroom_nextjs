import { useEffect, useState } from 'react'

import { SmallCloseIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Image,
  SlideFade,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
} from '@chakra-ui/react'
import axios from 'axios'
import Head from 'next/head'

import type { NextPage } from 'next'

type VideoInfo = {
  name: string
  url: string
  thumbnail: string
}
const SaveYoutubeToNotion: NextPage = () => {
  const [notionApiKey, setNotionApiKey] = useState('')
  const [youtubeApiKey, setYoutubeApiKey] = useState('')
  const [databaseId, setDatabaseId] = useState('')
  const [url, setUrl] = useState('')
  const [status, setstatus] = useState<'waiting' | 'loading' | 'success'>('waiting')
  const [info, setInfo] = useState<VideoInfo | null>(null)

  useEffect(() => {
    setNotionApiKey(localStorage.getItem('notionApiKey') || '')
    setYoutubeApiKey(localStorage.getItem('youtubeApiKey') || '')
    setDatabaseId(localStorage.getItem('databaseId') || '')
  }, [])

  const saveToNotion = async () => {
    setstatus('loading')
    axios
      .post('/api/notion', {
        youtubeApiKey: youtubeApiKey,
        notionApiKey: notionApiKey,
        databaseId: databaseId,
        url: url,
      })
      .then((res) => {
        console.log(res)
        setstatus('success')
        setInfo({
          name: res.data.properties.Name.title[0].plain_text,
          url: res.data.url,
          thumbnail: res.data.cover.external.url,
        })
      })
      .catch((err) => {
        console.log(err)
        setstatus('waiting')
        setUrl('')
      })
  }

  return (
    <>
      <Head>
        <title>Save Youtube to Notion</title>
      </Head>
      <Container sx={{ py: '3rem' }}>
        <Heading as='h2' sx={{ textAlign: 'center' }}>
          Save Youtube to Notion
        </Heading>
        <Box sx={{ my: '1rem' }}>
          <Text sx={{ mb: '.5rem' }}>Notion API KEY</Text>
          <InputGroup>
            <Input
              value={notionApiKey}
              onChange={(e) => {
                window.localStorage.setItem('notionApiKey', e.target.value)
                setNotionApiKey(e.target.value)
              }}
            />
            <InputRightElement>
              <IconButton
                aria-label='reset text'
                onClick={() => setNotionApiKey('')}
                icon={<SmallCloseIcon />}
                variant='ghost'
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box sx={{ my: '1rem' }}>
          <Text sx={{ mb: '.5rem' }}>Youtube API KEY</Text>
          <InputGroup>
            <Input
              value={youtubeApiKey}
              onChange={(e) => {
                window.localStorage.setItem('youtubeApiKey', e.target.value)
                setYoutubeApiKey(e.target.value)
              }}
            />
            <InputRightElement>
              <IconButton
                aria-label='reset text'
                onClick={() => setYoutubeApiKey('')}
                icon={<SmallCloseIcon />}
                variant='ghost'
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box sx={{ my: '1rem' }}>
          <Text sx={{ mb: '.5rem' }}>Notion database ID</Text>
          <InputGroup>
            <Input
              value={databaseId}
              onChange={(e) => {
                window.localStorage.setItem('databaseId', e.target.value)
                setDatabaseId(e.target.value)
              }}
            />
            <InputRightElement>
              <IconButton
                aria-label='reset text'
                onClick={() => setDatabaseId('')}
                icon={<SmallCloseIcon />}
                variant='ghost'
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box sx={{ my: '1rem' }}>
          <Text sx={{ mb: '.5rem' }}>Youtube video URL</Text>
          <InputGroup>
            <Input
              placeholder='https://youtube.com/xxxxxxxxxx'
              value={url}
              onChange={(e) => {
                setstatus('waiting')
                setUrl(e.target.value)
              }}
              disabled={status === 'loading'}
            />
            <InputRightElement>
              <IconButton
                aria-label='reset text'
                onClick={() => setUrl('')}
                icon={<SmallCloseIcon />}
                variant='ghost'
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            textAlign: 'center',
            my: '1rem',
          }}
        >
          {status === 'loading' && (
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' />
          )}
          <Button
            aria-label='save to notion'
            onClick={saveToNotion}
            disabled={!url.startsWith('https://')}
          >
            Save
          </Button>
        </Box>
        <SlideFade in={status === 'success'} offsetY='3rem'>
          <Box
            borderWidth={1}
            borderRadius='lg'
            sx={{ my: '1rem', p: '1rem', textAlign: 'center' }}
          >
            <Heading as='h3' size='lg'>
              Success!
            </Heading>
            {info && (
              <>
                <Image src={info.thumbnail} alt='thumbnail' />
                <TableContainer>
                  <Table variant='simple'>
                    <Tbody>
                      <Tr>
                        <Th>name</Th>
                        <Td>{info.name}</Td>
                      </Tr>
                      <Tr>
                        <Th>url</Th>
                        <Td>
                          <Link href={info.url} isExternal>
                            {info.url}
                            <ExternalLinkIcon mx='2px' />
                          </Link>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        </SlideFade>
      </Container>
    </>
  )
}

export default SaveYoutubeToNotion
