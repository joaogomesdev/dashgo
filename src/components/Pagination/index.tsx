import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
} 

export function Pagination({
  onPageChange, 
  totalCountOfRegisters, 
  currentPage = 1,
  registersPerPage = 10,
}: PaginationProps) {
  
  // 2 to 5 -> 2 3 4 5
  // 2 to 5 -> [0, 0 ,0] -> [2 + 0 + 1 , 2 + 1 + 1 , 2 + 2 + 1] -> [3, 4, 5]
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);


  const siblingsCount = 1

  
  function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
      .map((_, i) =>  i + from + 1)
      .filter(page => page > 0)
  }

 
  

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []
  
  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack
      direction={ ['column', 'row']}
      mt="8"
      justify='space-between'
      align='center'
      spacing='6'
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de strong <strong>100</strong>
      </Box>
      <Stack direction='row' spacing='2'>
        {currentPage > (1 + siblingsCount) && (
          <>  
            <PaginationItem onPageChange={onPageChange}  number={1}  />
            {currentPage > (2 + siblingsCount) &&
              <Text
                color='gray.200'
                w='8'
                textAlign='center'
              >...</Text>
            }
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page}  />
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />
        
        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page}  />
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage &&
              <Text
                color='gray.200'
                w='8'
                textAlign='center'
              >...</Text>
            }
          <PaginationItem onPageChange={onPageChange}  number={lastPage}  />
          </>
        )}
        
      </Stack>
    </Stack>
  );
}