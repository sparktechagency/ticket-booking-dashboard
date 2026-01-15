import { useState, useMemo } from "react";
import { Button, TablePagination, CircularProgress } from "@mui/material";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaRunning } from "react-icons/fa";

import { TeamManagementModal } from "../UI/TeamManagementModal";
import { DeleteConfirmationModal } from "../UI/DeleteConfirmationModal";
import {
  useGetAllTeamsQuery,
  useDeleteTeamMutation,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "../../Redux/api/teamsApi";
import { toast } from "sonner";
import { getImageUrl } from "../../utils/baseUrl";

export default function Teams() {
  /* -------------------- API -------------------- */
  const { data: teamsResponse, isLoading, isError,refetch } = useGetAllTeamsQuery();
  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();
  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();

  const teams = teamsResponse?.data?.data || [];
  console.log("teams", teams);

  const imageUrl = getImageUrl();

  /* -------------------- STATE -------------------- */
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  /* -------------------- FILTERING -------------------- */
  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teams, searchQuery]);

  /* -------------------- PAGINATION -------------------- */
  const paginatedTeams = filteredTeams.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  /* -------------------- HANDLERS -------------------- */
  const confirmDelete = (team) => {
    setDeleteTarget(team);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return;
    try {
      const deleteResponse = await deleteTeam(deleteTarget.id || deleteTarget._id).unwrap();
      console.log("deleteResponse", deleteResponse);
      toast.success("Team deleted successfully!");
      setDeleteTarget(null);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.data?.message || "Failed to delete team");
    }
  };

  /* -------------------- RENDER -------------------- */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-white">Something went wrong while loading teams.</p>
    );
  }

  return (
    <div className="space-y-6 h-screen bg-[#0a0d27] p-6 overflow-y-auto">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99a1af]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams..."
            className="w-full pl-10 pr-4 h-12 bg-[#030a1d] border border-white/10 rounded-xl text-white placeholder:text-[#99a1af]"
          />
        </div>

        <Button
          sx={{
            textTransform: "none",
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "linear-gradient(to right, #6d1db9, #bd85f1)",
            color: "white",
            borderRadius: "12px",
            cursor: "pointer",
            "&:hover": {
              background: "linear-gradient(to right, #5b189b, #a66fd9)",
            },
          }}
          onClick={() => {
            setEditingTeam(null);
            setTeamModalOpen(true);
          }}
        >
          <FaPlus />
          Add Team
        </Button>
      </div>

      {/* Teams List */}
      <div className="space-y-4">
        {paginatedTeams.map((team) => (
          <div
            key={team.id || team._id}
            className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/60 border border-white/10 rounded-3xl p-6"
          >
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <img
                src={`${imageUrl}${team?.image}`}
                alt={team.name}
                className="w-full lg:w-32 h-48 lg:h-32 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl text-white font-display">{team.name}</h3>
                <p className="text-[#bd85f1] mb-2">{team.genre}</p>
              </div>

              <div className="flex lg:flex-col gap-2">
                <button
                  onClick={() => {
                    setEditingTeam(team);
                    setTeamModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#bd85f1]/10 text-[#bd85f1] rounded-xl flex items-center gap-2 cursor-pointer transition hover:bg-[#bd85f1]/20"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => confirmDelete(team)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl flex items-center gap-2 cursor-pointer transition hover:bg-red-500/20"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {paginatedTeams.length === 0 && (
          <div className="text-center text-[#99a1af] py-10">
            No teams found. Add your first team!
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredTeams.length > 0 && (
        <div className="bg-[#030a1d] border border-white/10 rounded-2xl">
          <TablePagination
            component="div"
            count={filteredTeams.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{
              color: "white",
              "& .MuiSvgIcon-root": { color: "#bd85f1" },
            }}
          />
        </div>
      )}

      {/* Team Modal */}
      <TeamManagementModal
        team={editingTeam}
        isOpen={teamModalOpen}
        isLoading={isCreating || isUpdating}
        onClose={() => {
          setTeamModalOpen(false);
          setEditingTeam(null);
        }}
        onSave={async (teamFormData) => {
          try {
            if (editingTeam) {
              const updateResponse = await updateTeam({
                id: editingTeam.id || editingTeam._id,
                data: teamFormData,
              }).unwrap();
              console.log("updateResponse", updateResponse);
              toast.success("Team updated successfully!");
              refetch()
            } else {
              const createResponse = await createTeam(teamFormData).unwrap();
              console.log("createResponse", createResponse);
              toast.success("Team created successfully!");
            }
            setTeamModalOpen(false);
            setEditingTeam(null);
          } catch (error) {
            console.log("error", error);
            toast.error(error?.data?.message || "Failed to save team");
          }
        }}
      />

      {/* delete confirmation modal */}
      <DeleteConfirmationModal
        open={Boolean(deleteTarget)}
        title="Delete Team"
        description={
          <>
            Are you sure you want to delete{" "}
            <strong style={{ color: "white" }}>{deleteTarget?.name}</strong>?
            This action cannot be undone.
          </>
        }
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
}
