import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { apiUrl, getAuthHeaders } from "@/lib/api";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: "new" | "in-progress" | "replied" | "closed";
  isRead: boolean;
  repliedAt: string | null;
  notes: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
}

interface EnquiryStats {
  total: number;
  unread: number;
  new: number;
}

export default function AdminEnquiries() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch enquiry stats
  const { data: stats } = useQuery<EnquiryStats>({
    queryKey: ["enquiry-stats"],
    queryFn: async () => {
      const res = await fetch(apiUrl("/api/admin/enquiries/stats"), {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    refetchInterval: 30000,
  });

  // Fetch enquiries
  const { data: enquiries = [], isLoading, refetch } = useQuery<Enquiry[]>({
    queryKey: ["enquiries", search, status],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (status !== "all") params.append("status", status);

      const res = await fetch(
        apiUrl(`/api/admin/enquiries?${params}`),
        {
          headers: getAuthHeaders(),
        }
      );
      if (!res.ok) throw new Error("Failed to fetch enquiries");
      const data = await res.json();
      return data.enquiries || [];
    },
  });

  const handleViewEnquiry = async (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setNotes(enquiry.notes || "");
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);

    try {
      const res = await fetch(
        apiUrl(`/api/admin/enquiries/${selectedEnquiry.id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            status: newStatus,
            notes,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update enquiry");

      // Update local state
      setSelectedEnquiry({
        ...selectedEnquiry,
        status: newStatus as Enquiry["status"],
      });

      refetch();
    } catch (error) {
      console.error("Error updating enquiry:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkReplied = async () => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);

    try {
      const res = await fetch(
        apiUrl(`/api/admin/enquiries/${selectedEnquiry.id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            markReplied: true,
            notes,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update enquiry");

      setSelectedEnquiry({
        ...selectedEnquiry,
        status: "replied",
        repliedAt: new Date().toISOString(),
      });

      refetch();
    } catch (error) {
      console.error("Error marking as replied:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteEnquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const res = await fetch(
        apiUrl(`/api/admin/enquiries/${id}`),
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) throw new Error("Failed to delete enquiry");

      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "replied":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (s: string) => {
    switch (s) {
      case "new":
        return <AlertCircle className="w-4 h-4" />;
      case "in-progress":
        return <Loader2 className="w-4 h-4" />;
      case "replied":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (!user) {
    return <div className="p-4">Please log in to view enquiries.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Enquiries</p>
                <p className="text-3xl font-bold">{stats?.total || 0}</p>
              </div>
              <Mail className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Enquiries</p>
                <p className="text-3xl font-bold">{stats?.new || 0}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-3xl font-bold">{stats?.unread || 0}</p>
              </div>
              <Mail className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries List */}
      <Card>
        <CardHeader>
          <CardTitle>Enquiries</CardTitle>
          <CardDescription>
            {enquiries.length} enquiries found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : enquiries.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No enquiries found.</p>
          ) : (
            <div className="space-y-2">
              {enquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition"
                  onClick={() => handleViewEnquiry(enquiry)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{enquiry.name}</h3>
                        {!enquiry.isRead && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{enquiry.email}</p>
                      {enquiry.subject && (
                        <p className="text-sm text-gray-700 mt-1 truncate">
                          {enquiry.subject}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(enquiry.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(enquiry.status)}
                          <span>{enquiry.status}</span>
                        </div>
                      </Badge>
                      <p className="text-xs text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enquiry Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedEnquiry && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEnquiry.name}</DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Email</p>
                      <a
                        href={`mailto:${selectedEnquiry.email}`}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-4 h-4" />
                        {selectedEnquiry.email}
                      </a>
                    </div>
                    {selectedEnquiry.phone && (
                      <div>
                        <p className="text-gray-600">Phone</p>
                        <a
                          href={`tel:${selectedEnquiry.phone}`}
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-4 h-4" />
                          {selectedEnquiry.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject */}
                {selectedEnquiry.subject && (
                  <div>
                    <h4 className="font-semibold mb-2">Subject</h4>
                    <p className="text-gray-700">{selectedEnquiry.subject}</p>
                  </div>
                )}

                {/* Message */}
                <div>
                  <h4 className="font-semibold mb-2">Message</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border text-sm whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </div>
                </div>

                {/* Status & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Current Status</p>
                    <Badge className={getStatusColor(selectedEnquiry.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedEnquiry.status)}
                        <span>{selectedEnquiry.status}</span>
                      </div>
                    </Badge>
                  </div>
                  {selectedEnquiry.repliedAt && (
                    <div>
                      <p className="text-gray-600 mb-1 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Replied On
                      </p>
                      <p>
                        {new Date(selectedEnquiry.repliedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <h4 className="font-semibold mb-2">Admin Notes</h4>
                  <Textarea
                    placeholder="Add internal notes about this enquiry..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Select value={selectedEnquiry.status} onValueChange={handleUpdateStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={handleMarkReplied}
                    disabled={isUpdating || selectedEnquiry.status === "replied"}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Replied
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                    disabled={isUpdating}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
