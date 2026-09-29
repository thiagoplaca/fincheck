import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImage from "../../../../../assets/emptyStateImage.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../app/utils/FormatDate";
import { EditTransactionModal } from "../../modals/EditTransactionModal";

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    isPending,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal,
    isEditModalOpen,
    transactionBeingEdited,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters("type")}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                initialSlide={filters.month}
                slidesPerView={3}
                centeredSlides
                onSlideChange={(swiper) => {
                  handleChangeFilters("month")(swiper.realIndex);
                }}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isPending && (
              <div className="h-full flex flex-col items-center justify-center">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isPending && (
              <div className="h-full flex flex-col items-center justify-center">
                {!hasTransactions && (
                  <>
                    <img src={emptyStateImage} alt="Empty State Logo" />
                    <span className="text-gray-700">
                      Não encontramos essa transação!
                    </span>
                  </>
                )}
              </div>
            )}
            {hasTransactions && !isPending && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditTransactionModal}
                    transaction={transactionBeingEdited}
                  />
                )}
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer"
                    role="button"
                    onClick={() => handleOpenEditTransactionModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === "EXPENSE" ? "expense" : "income"
                        }
                        category={transaction.category?.icon}
                      />

                      <div className="flex flex-col">
                        <strong className="font-bold tracking-[-0.5px]">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "tracking-[-0.5px] font-medium",
                        !areValuesVisible && "blur-sm",
                        transaction.type === "EXPENSE"
                          ? "text-red-800"
                          : "text-green-800",
                      )}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
