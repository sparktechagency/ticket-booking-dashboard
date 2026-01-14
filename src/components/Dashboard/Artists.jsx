import { useState, useMemo } from "react";
import { Button, TablePagination } from "@mui/material";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter,
  FaTicketAlt,
  FaStar,
} from "react-icons/fa";

import { ArtistManagementModal } from "../UI/ArtistManagementModal";
import { artistsData } from "../../../public/data/artistData";
import { DeleteConfirmationModal } from "../UI/DeleteConfirmationModal";

export default function Artists() {
  const [artists, setArtists] = useState(artistsData);
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

  const handleDeleteConfirmed = () => {
    setArtists((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 h-screen bg-[#0a0d27] p-6 overflow-y-auto">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99a1af]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <div
            key={artist.id}
            className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/60 border border-white/10 rounded-3xl p-6"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full lg:w-32 h-48 lg:h-32 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl text-white font-display">
                  {artist.name}
                </h3>
                <p className="text-[#bd85f1] mb-2">{artist.genre}</p>

                <p className="text-sm text-[#99a1af] mb-4 line-clamp-2">
                  {artist.bio}
                </p>

                <div className="flex gap-4 text-sm text-[#99a1af]">
                  <span className="flex items-center gap-2">
                    <FaTicketAlt />
                    {artist.upcomingEvents?.length || 0} Events
                  </span>
                </div>
              </div>

              <div className="flex lg:flex-col gap-2">
                <button
                  onClick={() => {
                    setEditingArtist(artist);
                    setArtistModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#bd85f1]/10 text-[#bd85f1] rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => confirmDelete(artist)}
                  className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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
        onSave={(artistData) => {
          if (editingArtist) {
            setArtists((prev) =>
              prev.map((a) =>
                a.id === editingArtist.id ? { ...a, ...artistData } : a
              )
            );
          } else {
            setArtists((prev) => [...prev, { ...artistData, id: Date.now() }]);
          }

          setArtistModalOpen(false);
          setEditingArtist(null);
        }}
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
