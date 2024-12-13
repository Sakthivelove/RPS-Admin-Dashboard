import React, { useState, useEffect, useRef } from 'react'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePrizePools } from '../hooks/usePrizePools';
import { useSidebar } from '../context/SidebarContext';
import { getContainerClass } from '../utils';
import { PrizePool } from '../types';
import Table from '../components/common/Table';
import { FiEdit } from 'react-icons/fi';
import { updatePrizePool } from '../services/prizepoolService';

const PrizePools: React.FC = () => {
    const { data, error, isLoading, refetch } = usePrizePools();
    const { sidebarActive } = useSidebar();

    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [updatedPercentage, setUpdatedPercentage] = useState<string>('');
    const [updateError, setUpdateError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const columns = ['S.No', 'Position', 'Percentage', 'Actions'];

    useEffect(() => {
        const handleClickOutside = () => {
            setEditingRow(null);
        };

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setEditingRow(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    useEffect(() => {
        if (editingRow !== null) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }, [editingRow]);

    const validatePercentage = (value: string) => {
        const num = parseFloat(value);
        // Ensure the value is a valid number between 0 and 100
        if (isNaN(num) || num < 0 || num > 100) {
            return false;
        }
        return true;
    };

    const handleEdit = (index: number, currentPercentage: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setEditingRow(index);
        setUpdatedPercentage(currentPercentage);
        setUpdateError(null);
    };

    const handleUpdate = async (id: number) => {
        // Remove non-numeric characters except for the decimal point
        const sanitizedPercentage = updatedPercentage.trim().replace(/[^0-9.]/g, '');
    
        // Check if the sanitized input is empty or contains invalid characters
        if (sanitizedPercentage !== updatedPercentage) {
            toast.error('Please enter a valid number with no extra characters!');
            return;
        }
    
        // Validate percentage
        if (!validatePercentage(sanitizedPercentage)) {
            toast.error('Invalid percentage! Enter a value between 0 and 100.');
            return;
        }
    
        try {
            await updatePrizePool(id, parseFloat(sanitizedPercentage));
            toast.success(`Prize pool percentage updated to ${sanitizedPercentage}% successfully!`);
            setEditingRow(null);
            refetch();
        } catch {
            toast.error('Failed to update prize pool. Please try again.');
        }
    };
    

    const handleKeyDown = async (event: React.KeyboardEvent, id: number) => {
        if (event.key === 'Enter') {
            await handleUpdate(id);
        }
    };

    const mappedData = data?.map((prizePool: PrizePool, index) => ({
        'S.No': index + 1,
        Position: prizePool.position,
        Percentage:
            editingRow === index ? (
                <input
                    type="text"
                    ref={inputRef}
                    value={updatedPercentage}
                    onChange={(e) => setUpdatedPercentage(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, prizePool.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gray-800 text-white px-2 py-1 rounded w-[35%] text-center"
                />
            ) : (
                `${prizePool.percentage}%`
            ),
        Actions:
            editingRow === index ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate(prizePool.id);
                    }}
                    className="text-green-500 hover:text-green-700"
                >
                    Save
                </button>
            ) : (
                <div className="flex justify-center">
                    <FiEdit
                        className="text-yellow-500 cursor-pointer hover:text-yellow-700"
                        onClick={(e) => handleEdit(index, prizePool.percentage.toString(), e)}
                    />
                </div>
            ),
    })) || [];

    return (
        <div className={`${getContainerClass(sidebarActive)} text-white`}>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="relative z-10 overflow-auto h-full p-[2%]">
            <Table
                title="Prize Pools"
                columns={columns}
                data={mappedData}
                rowColor="bg-[#0F1C23]"
                tableBgColor="bg-[#1A1D26]"
                headerTextColor="text-[#45F882]"
                isLoading={isLoading}
                error={error !== null}
                loadingMessage="Loading prize pools..."
                errorMessage="Error loading prize pools, please try again."
                showSearchBar={true}
                width="50%"
            />
            </div>
            {updateError && <div className="text-red-500 mt-4">{updateError}</div>}
        </div>
    );
};

export default PrizePools;
