import { useState, useMemo } from "react";
import { Button, TablePagination, CircularProgress } from "@mui/material";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTicketAlt } from "react-icons/fa";
import { toast } from "sonner";

import { ArtistManagementModal } from "../UI/ArtistManagementModal";
// import { artistsData } from "../../../public/data/artistData";
import { DeleteConfirmationModal } from "../UI/DeleteConfirmationModal";
import {
  useGetAllArtistsQuery,
  useCreateArtistMutation,
  useUpdateArtistMutation,
  useDeleteArtistMutation,
  useGetArtistByIdQuery,
} from "../../Redux/api/artistApi";
import { getImageUrl } from "../../utils/baseUrl";

const ArtistCard = ({
  artist,
  imageUrl,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  const { data: artistByIdResponse } = useGetArtistByIdQuery(
    artist.id || artist._id
  );
  const detailedArtist = artistByIdResponse?.data || artistByIdResponse || artist;

  return (
    <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/60 border border-white/10 rounded-3xl p-6">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <img
          src={
            detailedArtist.image
              ? `${imageUrl}${detailedArtist.image}`
              : "https://via.placeholder.com/400?text=No+Image"
          }
          alt={detailedArtist.name}
          className="w-full lg:w-32 h-48 lg:h-32 rounded-2xl object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400?text=No+Image";
          }}
        />

        <div className="flex-1">
          <h3 className="text-xl text-white font-display">
            {detailedArtist.name}
          </h3>
          <p className="text-[#bd85f1] mb-2">{detailedArtist.genre}</p>

          {detailedArtist?.bio && (
            <p className="text-sm text-[#99a1af] mb-4 line-clamp-2">
              {detailedArtist.bio}
            </p>
          )}

          <div className="flex gap-4 text-sm text-[#99a1af]">
            <span className="flex items-center gap-2">
              <FaTicketAlt />
              {detailedArtist.events?.length || 0} Events
            </span>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2">
          <button
            onClick={() => onEdit(detailedArtist)}
            className="px-4 py-2 bg-[#bd85f1]/10 text-[#bd85f1] rounded-xl flex items-center gap-2 cursor-pointer"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => onDelete(detailedArtist)}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Artists() {
  const { data: artistsResponse, isLoading, isError } = useGetAllArtistsQuery();
  const [createArtist, { isLoading: isCreating }] = useCreateArtistMutation();
  const [updateArtist, { isLoading: isUpdating }] = useUpdateArtistMutation();
  const [deleteArtist, { isLoading: isDeleting }] = useDeleteArtistMutation();

  const artists = artistsResponse?.data?.data || [];
  console.log(artists);
  const imageUrl = getImageUrl();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [artistModalOpen, setArtistModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [artists, searchQuery]);

  const paginatedArtists = filteredArtists.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const confirmDelete = (artist) => {
    setDeleteTarget(artist);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return;
    try {
      await deleteArtist(deleteTarget.id || deleteTarget._id).unwrap();
      toast.success("Artist deleted successfully!");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error?.data?.message || "Failed to delete artist");
    }
  };

  const handleSaveArtist = async (artistFormData) => {
    try {
      if (editingArtist) {
        await updateArtist({
          id: editingArtist.id || editingArtist._id,
          data: artistFormData,
        }).unwrap();
        toast.success("Artist updated successfully!");
      } else {
        await createArtist(artistFormData).unwrap();
        toast.success("Artist created successfully!");
      }
      setArtistModalOpen(false);
      setEditingArtist(null);
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error?.data?.message || "Failed to save artist");
    }
  };

  if (isLoading || isCreating || isUpdating) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <p className="text-white">
          Something went wrong while loading artists.
        </p>
      </div>
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search artists..."
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
            setEditingArtist(null);
            setArtistModalOpen(true);
          }}
        >
          <FaPlus />
          Add Artist
        </Button>
      </div>

      {/* Artists List */}
      <div className="space-y-4">
        {paginatedArtists.map((artist) => (
          <ArtistCard
            key={artist.id || artist._id}
            artist={artist}
            imageUrl={imageUrl}
            onEdit={(a) => {
              setEditingArtist(a);
              setArtistModalOpen(true);
            }}
            onDelete={confirmDelete}
            isDeleting={isDeleting}
          />
        ))}
        {paginatedArtists.length === 0 && (
          <div className="text-center text-[#99a1af] py-10">
            {searchQuery
              ? `No artists found matching "${searchQuery}"`
              : "No artists found. Add your first artist!"}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="bg-[#030a1d] border border-white/10 rounded-2xl">
        <TablePagination
          component="div"
          count={filteredArtists.length}
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

      {/* Artist Modal */}
      <ArtistManagementModal
        artist={editingArtist}
        isOpen={artistModalOpen}
        onClose={() => {
          setArtistModalOpen(false);
          setEditingArtist(null);
        }}
        onSave={handleSaveArtist}
      />

      {/* delete confirmation modal */}
      <DeleteConfirmationModal
        open={Boolean(deleteTarget)}
        title="Delete Artist"
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
