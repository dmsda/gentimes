'use client';

import { useState, useEffect, FormEvent } from 'react';
import { formatRelativeDate } from '@/lib/seo';

interface Comment {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
  replies?: Comment[];
}

interface CommentFormProps {
  articleId: string;
  parentCommentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CommentForm({ articleId, parentCommentId, onSuccess, onCancel }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/comments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          authorName,
          authorEmail,
          articleId,
          parentCommentId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Komentar berhasil dikirim! Menunggu moderasi.');
        setContent('');
        onSuccess?.();
      } else {
        setStatus('error');
        setMessage(data.error || 'Gagal mengirim komentar');
      }
    } catch {
      setStatus('error');
      setMessage('Terjadi kesalahan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Nama Anda *"
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 outline-none focus:border-blue-500"
          required
        />
        <input
          type="email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="Email (tidak ditampilkan) *"
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 outline-none focus:border-blue-500"
          required
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis komentar Anda..."
        rows={4}
        maxLength={1000}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 outline-none focus:border-blue-500"
        required
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-500">{content.length}/1000</span>
        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-neutral-700 px-4 py-2 text-neutral-400 hover:text-white"
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {status === 'loading' ? 'Mengirim...' : 'Kirim Komentar'}
          </button>
        </div>
      </div>
      {status !== 'idle' && (
        <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </form>
  );
}

interface CommentItemProps {
  comment: Comment;
  articleId: string;
  level?: number;
}

function CommentItem({ comment, articleId, level = 0 }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className={`${level > 0 ? 'ml-8 border-l border-neutral-800 pl-4' : ''}`}>
      <div className="rounded-lg bg-neutral-900/50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {comment.authorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="font-medium text-white">{comment.authorName}</span>
            <span className="ml-2 text-sm text-neutral-500">
              {formatRelativeDate(comment.createdAt)}
            </span>
          </div>
        </div>
        <p className="text-neutral-300">{comment.content}</p>
        {level === 0 && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="mt-2 text-sm text-blue-400 hover:text-blue-300"
          >
            {showReplyForm ? 'Batal' : 'Balas'}
          </button>
        )}
      </div>

      {showReplyForm && (
        <div className="mt-4 ml-8">
          <CommentForm
            articleId={articleId}
            parentCommentId={comment.id}
            onSuccess={() => setShowReplyForm(false)}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} articleId={articleId} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentSectionProps {
  articleId: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/article/${articleId}`);
      const data = await response.json();
      setComments(data.data || []);
    } catch {
      console.error('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  return (
    <section className="mt-12 border-t border-neutral-800 pt-8">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Komentar ({comments.length})
      </h2>

      {/* Comment Form */}
      <div className="mb-8 rounded-lg border border-neutral-800 bg-neutral-900/30 p-6">
        <h3 className="mb-4 font-semibold text-white">Tulis Komentar</h3>
        <CommentForm articleId={articleId} onSuccess={fetchComments} />
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-lg bg-neutral-900/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-neutral-800" />
                <div className="h-4 w-32 rounded bg-neutral-800" />
              </div>
              <div className="h-16 rounded bg-neutral-800" />
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} articleId={articleId} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-8 text-center">
          <p className="text-neutral-500">Belum ada komentar. Jadilah yang pertama!</p>
        </div>
      )}
    </section>
  );
}
