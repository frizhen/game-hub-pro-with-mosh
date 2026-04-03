import {
  Box,
  Center,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

const parsePrefetchRows = () => {
  const rawValue = import.meta.env.VITE_GAME_GRID_PREFETCH_ROWS;
  const parsed = Number.parseInt(rawValue ?? "", 10);

  if (Number.isNaN(parsed)) return 2;

  return Math.max(parsed, 1);
};

const GameGrid = () => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const games = data?.pages.flatMap((page) => page.results) ?? [];
  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 }) ?? 1;
  const prefetchRows = parsePrefetchRows();
  const hasLoaderRow = hasNextPage ? 1 : 0;
  const rowCount = Math.ceil((games.length + hasLoaderRow) / columnCount);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 420,
    overscan: 3,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    rowVirtualizer.measure();
  }, [columnCount, rowVirtualizer]);

  useEffect(() => {
    const lastVisibleRow = virtualRows[virtualRows.length - 1];

    if (!lastVisibleRow) return;

    if (
      lastVisibleRow.index >= rowCount - prefetchRows &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    virtualRows,
    rowCount,
    prefetchRows,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  if (error) return <Text>{error.message}</Text>;

  if (isLoading && games.length === 0)
    return (
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding="10px"
      >
        {skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    );

  if (!isLoading && games.length === 0)
    return (
      <Text padding="10px" color="gray.500">
        No games found.
      </Text>
    );

  return (
    <Box position="relative" height={`${rowVirtualizer.getTotalSize()}px`}>
      {virtualRows.map((virtualRow) => {
        const startIndex = virtualRow.index * columnCount;
        const rowGames = games.slice(startIndex, startIndex + columnCount);
        const showLoadingRow =
          hasNextPage &&
          rowGames.length < columnCount &&
          startIndex + rowGames.length >= games.length;

        return (
          <Box
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            transform={`translateY(${virtualRow.start}px)`}
            padding="10px"
          >
            <SimpleGrid columns={columnCount} spacing={6}>
              {rowGames.map((game) => (
                <GameCardContainer key={game.id}>
                  <GameCard game={game} />
                </GameCardContainer>
              ))}

              {showLoadingRow && (
                <Center minH="200px">
                  <Spinner />
                </Center>
              )}
            </SimpleGrid>
          </Box>
        );
      })}
    </Box>
  );
};

export default GameGrid;
