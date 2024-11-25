import Table from "../components/Table";
import { userListColumns, userListData } from "../constants/constants";

const UserList: React.FC = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 p-6 bg-opacity-80">
                <Table columns={userListColumns} data={userListData} title="User List" headerTextColor="text-[#45F882]"/>
            </div>
        </div>
    );
};

export default UserList;
