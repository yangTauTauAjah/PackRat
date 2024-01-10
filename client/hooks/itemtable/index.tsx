import React from 'react';
import { Text } from 'react-native';
import { Row } from 'react-native-table-component';
import { RStack } from '@packrat/ui';
import { formatNumber } from '../../utils/formatNumber';
import { EditPackItemModal } from '~/components/pack_table/EditPackItemModal';
import { DeletePackItemModal } from '~/components/pack_table/DeletePackItemModal';

export const flexArr = [2, 1, 1, 1, 0.65, 0.65, 0.65];

const useItemsTable = ({ styles, page, setPage }) => {
  const TitleRow = ({ title }) => {
    const rowData = [
      <RStack style={{ flexDirection: 'row', ...styles.mainTitle }}>
        <Text style={styles.titleText}>{title}</Text>
      </RStack>,
    ];

    return (
      <Row data={rowData} style={[styles.title]} textStyle={styles.titleText} />
    );
  };

  const TableItem = ({ itemData }) => {
    const { name, weight, category, quantity, unit, _id, type } = itemData;

    const rowData = [
      name,
      `${formatNumber(weight)} ${unit}`,
      quantity,
      `${category?.name || type}`,
      <EditPackItemModal
        closeModalHandler
        initialData={itemData}
        editAsDuplicate={false}
        setPage={setPage}
        page={page}
        /* need to fix these warnings */
        /* packId={null}
        currentPack={null}
        isModalOpen={null}
        onTrigger={null} */
      />,
      <DeletePackItemModal
        itemId={_id}
        /* need to fix these warnings */
        /* pack={null} */
      />,
    ];
    return <Row data={rowData} style={styles.row} flexArr={flexArr} />;
  };
  /**
   * Handles the logic for navigating to the next page.
   *
   * @return {undefined} This function doesn't return anything.
   */
  const handleNextPage = () => {
    setPage(page + 1);
  };
  /**
   * Handles the action of going to the previous page.
   *
   * @return {undefined} There is no return value.
   */
  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return {
    TitleRow,
    TableItem,
    handleNextPage,
    handlePreviousPage,
  };
};

export default useItemsTable;
